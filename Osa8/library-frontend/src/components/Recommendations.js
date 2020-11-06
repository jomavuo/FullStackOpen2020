import React from 'react'

const Recommendations = (props) => {
  
  if (!props.show) {
    return null
  }
  const books = props.books

  const favorite = props.user.favoriteGenre

  let genres = []

  for (let book of books) {
    for (let genre of book.genres) {
      genres.push(genre)
    }
  }

  if (favorite) {
    return (
      <div>
        <h2>books</h2>
        <p>books in your favorite genre <strong>{favorite}</strong></p>
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
            {books.filter(b => b.genres.includes(favorite)).map(b =>
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Recommendations