const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer')) {
//     return authorization.substring(7)
//   }
//   return null
// }


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments')
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // const token = getTokenFrom(request)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await Blog.findById(savedBlog.id).populate('user')

  response.json(populatedBlog.toJSON())
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)

  if (blog) {
    const comment = new Comment({
      content: body.content
    })
    const savedComment = await comment.save()

    blog.comments = blog.comments.concat(savedComment)
    await blog.save()

    const populatedBlog = await Blog.findById(blog.id).populate('comments')
    response.json(populatedBlog.toJSON())

  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if (user._id.toString() === blog.user.toString()) {
    const filter = { _id: user._id }
    const updatedBlogs = user.blogs.filter(b => b.toString() !== request.params.id.toString())
    const comments = blog.comments

    for (let comment of comments) {
      await Comment.findByIdAndRemove(comment._id)
    }

    await Blog.findByIdAndRemove(request.params.id)
    let updatedUser = await User.findOneAndUpdate(filter, { blogs: updatedBlogs }, { new: true })
    await updatedUser.save()
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'you have no permission to delete this blog' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  const populatedBlog = await Blog.findById(updatedBlog.id).populate('user').populate('comments')

  response.json(populatedBlog.toJSON())
})

module.exports = blogsRouter