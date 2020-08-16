import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { Switch, Route, useHistory, Redirect, useRouteMatch } from 'react-router-dom'
import Users from './components/Users'
import Login from './components/Login'
import User from './components/User'
import Navigation from './components/Navigation'
import BlogInfo from './components/BlogInfo'
import { uniqBy } from 'lodash'
import { Container } from 'react-bootstrap'
import './App.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const users = blogs.map(blog => blog.user)
  const uniqueUsers = uniqBy(users, 'id')

  const history = useHistory()

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  return (
    <Container className="justify-content-md-center mt-2 mb-2">
      <Notification />
      {user ? <Navigation user={user} history={history} /> : null}
      <Switch>
        <Route path='/users/:id'>
          {user ? <User blogs={blogs} userMatch={userMatch} users={users} uniqueUsers={uniqueUsers} />
            : <Redirect to='/' />}
        </Route>
        <Route path='/blogs/:id'>
          {user ? <BlogInfo blogs={blogs} blogMatch={blogMatch} user={user} />
            : <Redirect to='/' />}
        </Route>
        <Route path='/blogs'>
          {user ? <BlogList blogs={blogs} history={history} user={user} />
            : <Redirect to='/' />}
        </Route>
        <Route path='/users'>
          {user ? <Users blogs={blogs} uniqueUsers={uniqueUsers} />
            : <Redirect to='/' />}
        </Route>
        <Route path='/'>
          {user ? <Redirect to='/blogs' /> : <Login history={history} />}
        </Route>
      </Switch>
    </Container >
  )
}

export default App