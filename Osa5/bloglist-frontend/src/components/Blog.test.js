import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> tests', () => {
  let component
  let mockHandler
  let user
  let testBlog

  beforeEach(() => {
    mockHandler = jest.fn()

    user = {
      username: 'testikayttaja',
      name: 'Testin Käyttäjä'
    }

    testBlog = {
      title: 'testBlog',
      author: 'testAuthor',
      url: 'www.testBlog.com',
      likes: 1,
      user: {
        username: 'testikayttaja',
        name: 'Testin Käyttäjä',
      }
    }

    component = render(
      <Blog blog={testBlog} user={user} updateBlog={mockHandler} />
    )
  })

  test('first renders only author and title', () => {
    expect(component.container).toHaveTextContent('testBlog by testAuthor')
    expect(component.container).not.toHaveTextContent('www.testBlog.com')
    expect(component.container).not.toHaveTextContent('Likes: 1')
  })

  test('renders url and likes after pressing "View"-button', () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent('testBlog by testAuthor')
    expect(component.container).toHaveTextContent('www.testBlog.com')
    expect(component.container).toHaveTextContent('Likes: 1')
  })

  test('clicking "like" twice fires function twice', async () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})