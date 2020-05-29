const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''

beforeAll(async () => {
  await User.deleteMany({})

  const initialUser = helper.initialUsers[0]
  await api
    .post('/api/users')
    .send({ username: initialUser.username, name: initialUser.name, password: initialUser.password })

  const loginResult = await api
    .post('/api/login')
    .send({ username: initialUser.username, password: initialUser.password })

  token = loginResult.body.token.toString()
})

describe('when initial blogs are saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContainEqual('Go To Statement Considered Harmful')
  })

  test('id is named "id" and not "_id"', async () => {
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].id).toBeDefined()
    expect(blogsAtEnd[1].id).toBeDefined()
    expect(blogsAtEnd[0]._id).not.toBeDefined()
  })
})

describe('when saving a new blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('a blog can be added: returns the right amount of blogs and correct url', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const urls = blogsAtEnd.map(r => r.url)
    expect(urls).toContainEqual('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
  })

  test('if no token, return unauthorized', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
    expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if initially no likes defined, give a value of 0', async () => {
    const blogNoLikes =
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blogNoLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].likes).toEqual(7)
    expect(blogsAtEnd[1].likes).toEqual(5)
    expect(blogsAtEnd[2].likes).toEqual(0)
  })

  test('if no title defined, return status "400 bad request"', async () => {
    const blogNotValid =
    {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blogNotValid)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if no url defined, return status "400 bad request"', async () => {
    const blogNotValid =
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blogNotValid)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting a blog', () => {
  it('should succeed with a status code 204 if id is valid', async () => {
    await Blog.deleteMany({})
    const deletableBlog = new Blog({
      title: 'Type wars',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      author: 'Robert C. Martin',
      likes: 2
    })
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(deletableBlog)

    const blogsAtStart = await helper.blogsInDb()
    expect(blogsAtStart).toHaveLength(1)
    const blogToDelete = blogsAtStart[0]
    console.log('blogtodelete:', blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContainEqual(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  it('should succeed with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const update = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 20
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toEqual(update.likes)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
      username: 'user1',
      password: 'salainen12'
    })
    await user.save()
  })

  test('new user is created with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user-creation fails with proper status code and message if username is taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const doubleUser = {
      username: 'user1',
      name: 'Doubleuser',
      password: 'salainen'
    }
    const result = await api
      .post('/api/users')
      .send(doubleUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('username is required', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '',
      name: 'Miikka Luukkainen',
      password: 'salainen'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('username must be at least 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ml',
      name: 'Miikka Luukkainen',
      password: 'salainen'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` (`ml`) is shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('password is required', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Miikka Luukkainen',
      password: ''
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is required and min 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('password must be at least 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Miikka Luukkainen',
      password: 'pw'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is required and min 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})