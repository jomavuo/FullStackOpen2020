import React from 'react'
import { useDispatch } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { addNewBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Table } from 'react-bootstrap'

const Blogs = ({ blogs }) => {
  const dispatch = useDispatch()

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addNewBlog(newBlog))
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success'))
  }

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel='add new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {blogForm()}
      <h2>Blogs</h2>
      <Table striped hover>
        {blogs
          .sort(({ likes: previousLikes }, { likes: currentLikes }) => currentLikes - previousLikes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </Table>
    </div>
  )
}

export default Blogs