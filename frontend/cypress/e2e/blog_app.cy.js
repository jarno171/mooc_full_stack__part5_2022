describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'testinen testi',
      username: 'testinen',
      password: '123321'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('blogs').should('not.exist')
  })

  describe('login', () => {
    it('wrong creds dont work', function() {
      cy.get('input:first').type('aaa')
      cy.get('input:last').type('bee')
      cy.contains('login').click()
      cy.contains('blogs').should('not.exist')
      cy.contains('Wrong credentials')
        .should('have.attr', 'style')
        .then(style => expect(style).contains('color: red;'))
    })

    it('correct credentials work', function() {
      cy.get('input:first').type('testinen')
      cy.get('input:last').type('123321')
      cy.contains('login').click()
      cy.contains('blogs')
    })
  })

  describe('when logged in', () => {
    beforeEach(function() {
      cy.get('input:first').type('testinen')
      cy.get('input:last').type('123321')
      cy.contains('login').click()
    })

    it('a blog can be created', () => {
      cy.contains('add a new blog').click()
      cy.get('#title').type('testiblogi')
      cy.get('#author').type('toinentestaaja')
      cy.get('#url').type('www.lol.com')

      cy.get('#add-button').click()
      cy.contains('Added new blog')
      cy.contains('testiblogi')

      // hmm these can be seen because they are just hidden
      cy.contains('toinentestaaja').should('not.be.visible')
      cy.contains('www.lol.com').should('not.be.visible')
    })

    describe('when added a blog', () => {
      beforeEach(function() {
        cy.contains('add a new blog').click()
        cy.get('#title').type('testiblogi')
        cy.get('#author').type('toinentestaaja')
        cy.get('#url').type('www.lol.com')

        cy.get('#add-button').click()
      })

      it('user can like a blog', () => {
        cy.contains('view').click()

        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 0').should('not.exist')
        cy.contains('likes 1')
      })
    })

  })
})