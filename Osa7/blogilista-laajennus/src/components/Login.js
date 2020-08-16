import React, { useState } from 'react'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Form, FormGroup, Button, Row, Col } from 'react-bootstrap'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    dispatch(login(username, password))
    props.history.push('/blogs')
  }

  return (
    <div>
      <h2>Please login to Blog app</h2>
      <p></p>
      <Form onSubmit={handleLogin}>
        <FormGroup as={Row}>
          <Form.Label column sm={2}>Username</Form.Label>
          <Col sm={5}>
            <Form.Control
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)} />
          </Col>
        </FormGroup>
        <FormGroup as={Row}>
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={5}>
            <Form.Control
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)} />
          </Col>
        </FormGroup>
        <Button variant='primary' type="submit">Login</Button>
      </Form>
    </div >
  )
}

export default Login