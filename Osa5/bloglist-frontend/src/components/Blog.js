import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {

  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  const toggleView = () => {
    setExpanded(!expanded)
  }

  const handleLike = (blog) => {
    updateBlog(blog)
  }

  const handleRemove = (blog) => {
    removeBlog(blog)
  }

  return (
    <div style={blogStyle} className='blog'>
      {expanded ?
        <div>
          <p>{blog.title} by {blog.author} <button type="button" onClick={toggleView}>Hide</button></p>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes}<button type="button" onClick={() => handleLike(blog)}>Like</button></p>
          <p>{blog.user.name}</p>

          {user.username === blog.user.username ?
            <button type='button' onClick={() => handleRemove(blog)}>Remove</button> : <></>}
        </div>
        :
        <div>
          <p>{blog.title} by {blog.author} <button type='button' onClick={toggleView}>View</button></p>
        </div>}
    </div>
  )
}

export default Blog
