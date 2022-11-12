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
})