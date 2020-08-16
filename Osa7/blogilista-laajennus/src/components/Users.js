import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ blogs, uniqueUsers }) => {

  for (let user of uniqueUsers) {
    const blogsByUser = blogs.filter(blog => blog.user.id === user.id)
    user.blogs = blogsByUser
  }
  if (!(blogs || uniqueUsers)) {
    return null
  }

  return (
    <div>
      <Table striped hover>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {uniqueUsers
            .map(user =>
              <tr key={user.id}>
                <th><Link to={`/users/${user.id}`}>{user.name}</Link></th>
                <th>{user.blogs.length}</th>
              </tr>)}
        </tbody>
      </Table>
    </div >
  )
}

export default Users