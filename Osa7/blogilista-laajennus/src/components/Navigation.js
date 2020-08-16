import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Nav, Navbar } from 'react-bootstrap'

const Navigation = ({ user, history }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logOut())
    dispatch(setNotification(`${user.name} has safely logged out`, 'success'))
    history.push('/')
  }

  return (
    <div>
      <div>
        <Navbar bg='light' variant='light'>
          <Nav.Item>
            <Nav.Link href='/blogs'>Blogs</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='/users'>Users</Nav.Link>
          </Nav.Item>
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              {user.name} logged in &nbsp;
              <Button variant="secondary" size='sm' type="submit" id='logOutButton' onClick={handleLogout}>log out</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <h1>Blog app</h1>
    </div >
  )
}

export default Navigation