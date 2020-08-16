import React, { useState } from 'react'
import { Card, Button, Form, FormGroup, ListGroup, ListGroupItem } from 'react-bootstrap'

const Comment = ({ content }) => {
  return (
    <>
      <ListGroupItem>{content}</ListGroupItem>
    </>
  )
}

const BlogCard = ({ blog, like, addComment, user }) => {
  const [newComment, setNewComment] = useState('')

  const submitComment = (event) => {
    event.preventDefault()
    addComment(newComment)
    setNewComment('')
  }
  
  return (
    <div>
      <Card className='mb-2'>
        <Card.Body>
          <Card.Title>{blog.title} by {blog.author}</Card.Title>
          <Card.Subtitle>{blog.likes} likes <Button variant='success' type="button" size='sm'
            onClick={() => like(blog)}>Like</Button></Card.Subtitle>
          <Card.Link href={blog.url}>{blog.url}</Card.Link>
          <Card.Text>Added by {user.name}</Card.Text>

          <strong>comments:</strong>
          <ListGroup variant='flush'>
            {blog.comments.map(comment =>
              <Comment key={comment.id} content={comment.content} />
            )}
          </ListGroup>
        </Card.Body>
      </Card>

      <Form onSubmit={submitComment}>
        <FormGroup>
          <Form.Label>Add your comment:</Form.Label>
          <Form.Control
            id='comment'
            type='text'
            value={newComment}
            onChange={({ target }) => setNewComment(target.value)} />
        </FormGroup>
        <Button type='submit'>Send comment</Button>
      </Form>
    </div>
  )
}

export default BlogCard