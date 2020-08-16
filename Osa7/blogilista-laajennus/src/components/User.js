import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const User = ({ userMatch, users, uniqueUsers, blogs }) => {

  for (let user of uniqueUsers) {
    const blogsByUser = blogs.filter(blog => blog.user.id === user.id)
    user.blogs = blogsByUser
  }
  const user = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <ListGroup>Added blogs
        {user.blogs
          .map(blog =>
            <ListGroupItem key={blog.id} action href={`/blogs/${blog.id}`} variant='primary'>{blog.title}</ListGroupItem>
          )}
      </ListGroup>
    </div>
  )
}

export default User