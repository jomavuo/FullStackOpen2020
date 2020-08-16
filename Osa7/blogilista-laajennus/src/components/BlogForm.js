import React, { useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'

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
      <h2>Add a new blog</h2>
      <Form onSubmit={addBlog}>
        <FormGroup>
          <Form.Label>Title</Form.Label>
          <Form.Control
            id='title'
            type='text'
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)} />
        </FormGroup>
        <FormGroup>
          <Form.Label>Author</Form.Label>
          <Form.Control
            id='author'
            type='text'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)} />
        </FormGroup>
        <FormGroup>
          <Form.Label>URL</Form.Label>
          <Form.Control
            id='url'
            type='text'
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)} />
        </FormGroup>
        <Button variant="primary" type="submit" id='createButton'>Add blog</Button>
        <p></p>
      </Form>
    </div>
  )
}

export default BlogForm