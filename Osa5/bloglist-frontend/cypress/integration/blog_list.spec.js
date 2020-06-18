describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000/')
  })

  it('Login form is shown', function () {
    cy.get('form').contains('username')
    cy.get('form').contains('password')
    cy.get('form').contains('login')
  })

  describe('Login', function () {
    it('succeeds with right credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('form').contains('login').click()
      cy.contains('Welcome Matti Luukkainen')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('form').contains('login').click()
      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Welcome Matti Luukkainen')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('blog created by cypress')
      cy.get('#author').type('user1')
      cy.get('#url').type('www.test.com')
      cy.get('#createButton').click()

      cy.contains('a new blog blog created by cypress by user1 added')
      cy.contains('ul', 'blog created by cypress by user1')
    })

    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'TestBlog',
        author: 'author1',
        url: 'www.blogger.com',
        likes: 0
      })

      cy.get('ul').contains('View').click()
      cy.get('ul').contains('Like').click()
      cy.get('ul').contains('Likes: 1')
    })

    it('User can delete a blog', function () {
      cy.createBlog({
        title: 'TestBlog',
        author: 'author1',
        url: 'www.blogger.com'
      })

      cy.get('ul').contains('View').click()
      cy.get('ul').contains('Remove').click()
      cy.get('ul').should('not.contain', 'TestBlog by author1')
    })

    it('User cannot delete a blog by another user', function () {
      cy.createBlog({
        title: 'TestBlog',
        author: 'author1',
        url: 'www.blogger.com'
      })

      const anotherUser = {
        username: 'hellas',
        name: 'Arto Hellas',
        password: 'salainen'
      }

      cy.request('POST', 'http://localhost:3003/api/users', anotherUser)
      cy.login({ username: 'hellas', password: 'salainen' })

      cy.get('ul').contains('View').click()
      cy.get('ul').should('not.contain', 'Remove')
    })

    it('should sort blogs by likes', function () {
      cy.createBlog({
        title: 'blogWithLeastLikes',
        author: 'author1',
        url: 'www.blogger.com',
        likes: 0
      })

      cy.createBlog({
        title: 'blogWithMostLikes',
        author: 'author2',
        url: 'www.blogger.com',
        likes: 10
      })

      cy.createBlog({
        title: 'blogWithLikes',
        author: 'author3',
        url: 'www.blogger.com',
        likes: 5
      })

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('blogWithMostLikes')
        cy.wrap(blogs[1]).contains('blogWithLikes')
        cy.wrap(blogs[2]).contains('blogWithLeastLikes')
      })
    })
  })
})