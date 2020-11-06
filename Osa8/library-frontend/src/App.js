
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, GET_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const client = useApolloClient()

  const resultAllAuthors = useQuery(ALL_AUTHORS)
  const resultAllBooks = useQuery(ALL_BOOKS)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('bookinventory-user-token')
      if (token) {
        setToken(token)
        const { data } = await client.query({ query: GET_USER })
        setUser(data.me)
      }
    })()
  }, [client, token])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setUser(null)
    setPage('authors')
  }

  if (resultAllAuthors.loading || resultAllBooks.loading) {
    return <div>Loading...</div>

  } else if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <div>
          <Authors
            show={page === 'authors'} authors={resultAllAuthors.data.allAuthors}
          />

          <Books
            show={page === 'books'} books={resultAllBooks.data.allBooks}
          />

          <LoginForm
            show={page === 'login'} setToken={setToken} setPage={setPage}
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommendations</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors
        show={page === 'authors'} authors={resultAllAuthors.data.allAuthors} token={token}
      />

      <Books
        show={page === 'books'} books={resultAllBooks.data.allBooks}
      />

      <NewBook
        show={page === 'add'} setPage={setPage}
      />

      <Recommendations
        show={page === 'recommend'} books={resultAllBooks.data.allBooks} user={user}
      />

    </div>
  )
}

export default App