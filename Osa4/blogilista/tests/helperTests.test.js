const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const emptyList = []

    expect(listHelper.totalLikes(emptyList)).toBe(0)
  })

  test('when list has only one blog equals the likes of that (7 likes)', () => {
    const listWithOneBlog = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan', url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      }
    ]
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(7)
  })

  test('of a bigger list is calculated right (36 likes)', () => {
    const listWithMultipleBlogs = [
      { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
      { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
      { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
      { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
      { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
      { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
    ]
    expect(listHelper.totalLikes(listWithMultipleBlogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('empty list returns an empty object', () => {
    const emptyList = []

    expect(listHelper.getFavoriteBlog(emptyList)).toEqual({})
  })

  test('if only one blog, returns the one blog-object', () => {
    const listWithOneBlog = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan', url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      }
    ]
    expect(listHelper.getFavoriteBlog(listWithOneBlog)).toEqual(
      {
        title: 'React patterns',
        author: 'Michael Chan',
        likes: 7
      }
    )
  })

  test('returns the blog with most likes from a bigger list', () => {
    const listWithMultipleBlogs = [
      { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
      { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
      { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
      { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
      { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
      { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
    ]
    expect(listHelper.getFavoriteBlog(listWithMultipleBlogs)).toEqual(
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      }
    )
  })
  test('returns a blog from a list with equal many likes (containing 12 likes)', () => {
    const listWithEqualLikes = [
      { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
      { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
      { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
      { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 12, __v: 0 },
      { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
      { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 5, __v: 0 }
    ]
    expect(listHelper.getFavoriteBlog(listWithEqualLikes)).toHaveProperty('likes', 12)
  })
})

describe('mostBlogs', () => {
  const emptyList = []

  const listWithOneBlog = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan', url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    }
  ]
  const listWithMultipleBlogs = [
    { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
    { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
    { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
    { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Edsger W. Dijkstra', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
    { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Edsger W. Dijkstra', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
    { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
  ]
  test('with empty list returns empty object', () => {
    expect(listHelper.mostBlogs(emptyList)).toEqual({})
  })

  test('list with one blogger returns object "{ author: "Michael Chan", blogs: 1 }"', () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({ author: 'Michael Chan', blogs: 1 })
  })

  test('list with multiple blogs returns object "{ author: "Edsger W. Dijkstra", blogs: 4 }"', () => {
    expect(listHelper.mostBlogs(listWithMultipleBlogs)).toEqual({ author: 'Edsger W. Dijkstra', blogs: 4 })
  })

})
describe('mostLikes', () => {
  const emptyList = []

  const listWithOneBlog = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan', url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    }
  ]
  const listWithMultipleBlogs = [
    { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
    { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
    { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
    { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Edsger W. Dijkstra', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
    { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Edsger W. Dijkstra', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
    { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
  ]
  test('with empty list returns empty object', () => {
    expect(listHelper.mostLikes(emptyList)).toEqual({})
  })

  test('list with one blogger returns object "{ author: "Michael Chan", likes: 7 }"', () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({ author: 'Michael Chan', likes: 7 })
  })

  test('list with multiple blogs returns object "{ author: "Edsger W. Dijkstra", likes: 27 }"', () => {
    expect(listHelper.mostLikes(listWithMultipleBlogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 27 })
  })
})