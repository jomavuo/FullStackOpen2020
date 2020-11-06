import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const AuthorForm = (props) => {
  const [born, setBorn] = useState('')
  const [authorName, setAuthorName] = useState(null)

  const authorNames = props.authors.map(a => a.name)
  const options = []
  authorNames.forEach(a => {
    let item = { value: a, label: a }
    options.push(item)
  })

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()
    let name = authorName.value

    updateAuthor({ variables: { name, born } })
    setBorn('')
  }

  if (!props.token) {
    return null
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          options={options}
          defaultValue={authorName}
          onChange={setAuthorName}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm