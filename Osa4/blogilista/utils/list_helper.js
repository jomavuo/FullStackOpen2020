const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const getFavoriteBlog = (blogs) => {
  let mostLikedBlog = {}
  let likes = 0

  for (let blog of blogs) {
    if (blog.likes > likes) {
      mostLikedBlog = { title: blog.title, author: blog.author, likes: blog.likes }
      likes = mostLikedBlog.likes
    }
  }
  return mostLikedBlog
}

const mostBlogs = (blogs) => {

  let blogAuthors = []

  for (let blog of blogs) {
    blogAuthors.push(blog.author)
  }

  const names = _.uniq(blogAuthors)

  const listOfAuthors = []

  for (let author of names) {
    let newAuthor = { author: author, blogs: [] }

    for (let blog of blogs) {
      if (author === blog.author) {
        newAuthor.blogs.push(blog.title)
      }
    }
    listOfAuthors.push(newAuthor)
  }
  let mostBloggedAuthor = {}
  let blogsBy = 0

  for (let author of listOfAuthors) {
    if (author.blogs.length >= blogsBy) {
      mostBloggedAuthor = { author: author.author, blogs: author.blogs.length }
      blogsBy = author.blogs.length
    }
  }
  return mostBloggedAuthor
}

const mostLikes = (blogs) => {
  let blogAuthors = []

  for (let blog of blogs) {
    blogAuthors.push(blog.author)
  }

  const names = _.uniq(blogAuthors)

  const listOfAuthors = []

  for (let author of names) {
    let newAuthor = { author: author, likes: [] }
    for (let blog of blogs) {
      if (author === blog.author) {
        newAuthor.likes.push(blog.likes)
      }
    }
    listOfAuthors.push(newAuthor)
  }
  let mostLikedAuthor = {}
  let allLikes = 0

  for (let author of listOfAuthors) {
    let likesList = author.likes

    const reducer = (sum, item) => {
      return sum + item
    }
    let authorsLikes = likesList.reduce(reducer, 0)

    if (authorsLikes >= allLikes) {
      mostLikedAuthor = { author: author.author, likes: authorsLikes }
      allLikes = mostLikedAuthor.likes
    }
  }
  return mostLikedAuthor
}

module.exports = { dummy, totalLikes, getFavoriteBlog, mostBlogs, mostLikes }