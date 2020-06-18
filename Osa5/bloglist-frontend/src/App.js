import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ text: null, cName: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(
        {
          username, password,
        })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Welcome ${user.name}`, 'success')

    } catch (exception) {
      setMessage('wrong username or password', 'error')
    }
  }

  const setMessage = ((text, cName) => {
    setNotification({ text: text, cName: cName })
    setTimeout(() => {
      setNotification({ text: null, cName: null })
    }, 5000)
  })

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setMessage('You have safely logged out', 'success')
  }

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
      })
      .catch(() => {
        setMessage('Could not add blog, sorry', 'error')
      })
  }

  const updateBlog = (blog) => {
    const likedBlog = blogs.find(b => b.id === blog.id)
    const updatedBlog = { ...likedBlog, likes: likedBlog.likes + 1 }

    blogService
      .update(blog.id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
        setMessage('Thanks for liking!', 'success')
      })
      .catch(error => {
        setMessage(`Blog ${updatedBlog.title} was already removed from the server`, error)
      })
  }

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog} />
    </Togglable>
  )

  const deleteBlog = (blog) => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirm) {
      blogService
        .remove(blog.id)
        .then(setBlogs(blogs.filter(b => b.id !== blog.id)))

      setMessage(`Blog ${blog.title} by ${blog.author} removed!`, 'success')
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />

        <h2>Please login to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input
              id="password"
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification} />

      <h1>Blogs</h1>
      <p>{user.name} logged in
        <button type="submit" id='logOutButton' onClick={handleLogout}>log out</button>
      </p>

      {blogForm()}
      <ul>
        {blogs
          .sort(({ likes: previousLikes }, { likes: currentLikes }) => currentLikes - previousLikes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} removeBlog={deleteBlog} />
          )}
      </ul>
    </div>
  )
}

export default App