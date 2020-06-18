import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            id='title'
            type='text'
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)} />
        </div>
        <div>
          Author
          <input
            id='author'
            type='text'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)} />
        </div>
        <div>
          URL
          <input
            id='url'
            type='text'
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)} />
        </div>
        <button type="submit" id='createButton'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm