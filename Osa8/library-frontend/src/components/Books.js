import React, { useState } from 'react'
import { uniq } from 'lodash'

const Books = (props) => {
  const [filter, setFilter] = useState(null)

  if (!props.show) {
    return null
  }

  const books = props.books

  let genres = []

  for (let book of books) {
    for (let genre of book.genres) {
      genres.push(genre)
    }
  }

  const uniqueGenres = uniq(genres)

  const filterButton = (genre) => {
    setFilter(genre)
  }

  if (filter) {
    return (
      <div>
        <h2>books</h2>
        <p>in genre <strong>{filter}</strong></p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
            </th>
              <th>
                published
            </th>
            </tr>
            {books.filter(b => b.genres.includes(filter)).map(b =>
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        {uniqueGenres.map(g =>
          <button key={uniqueGenres.indexOf(g)}
            onClick={() => filterButton(g)}>{g}</button>
        )}
        <button onClick={() => filterButton(null)}>all genres</button>
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>books</h2>
        <p>in all genres</p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {books.map(b =>
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        {uniqueGenres.map(g =>
          <button key={uniqueGenres.indexOf(g)}
            onClick={() => filterButton(g)}>{g}</button>
        )}
        <button onClick={() => filterButton(null)}>all genres</button>
      </div>
    )
  }
}

export default Books