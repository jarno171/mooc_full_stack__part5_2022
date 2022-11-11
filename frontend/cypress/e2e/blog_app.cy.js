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

  it('login form can be opened', function() {
    cy.get('input:first').type('testinen')
    cy.get('input:last').type('123321')
    cy.contains('login').click()
  })
})