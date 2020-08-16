import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, addNewComment } from '../reducers/blogReducer'
import BlogCard from './BlogCard'

const BlogInfo = ({ blogs, blogMatch, user }) => {
  const dispatch = useDispatch()

  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const like = (blog) => {
    dispatch(updateBlog(blog))
  }

  const addComment = (comment) => {
    dispatch(addNewComment({
      content: comment
    }, blog))
  }

  if (!blog) {
    return null
  }
  
  return (
    <BlogCard blog={blog} like={like} addComment={addComment} user={user} />
  )
}

export default BlogInfo