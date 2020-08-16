import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('a new blog is added with valid data from <BlogForm />', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testTitle' }
  })

  fireEvent.change(author, {
    target: { value: 'testiBlogaaja' }
  })

  fireEvent.change(url, {
    target: { value: 'www.testiurl.com' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0]).toStrictEqual(
    {
      title: 'testTitle',
      author: 'testiBlogaaja',
      url: 'www.testiurl.com'
    })
})