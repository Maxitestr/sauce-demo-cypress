describe('Pokemon API', () => {
  const baseUrl = 'https://pokeapi.co/api/v2'

  it('GET /pokemon/bulbasaur — smoke test', () => {
    cy.allure().step('Получить информацию о покемоне Bulbasaur')
    cy.request('GET', `${baseUrl}/pokemon/bulbasaur`).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name.toLowerCase()).to.eq('bulbasaur')
      expect(response.body.id).to.be.a('number')
      expect(response.body.abilities).to.be.an('array').and.not.empty
    })
  })

  it('GET /pokemon/0 — возвращает 404', () => {
    cy.allure().step('Попытаться получить покемона с несуществующим ID')
    cy.request({
      url: `${baseUrl}/pokemon/0`,
      failOnStatusCode: false
    })
      .its('status')
      .should('eq', 404)
  })

  it('GET /pokemon?limit=10 — возвращает 10 покемонов', () => {
    cy.allure().step('Получить первых 10 покемонов с лимитом')
    cy.request(`${baseUrl}/pokemon?limit=10&offset=0`).its('body.results').should('have.length', 10)
  })

  it('GET /type/fire — получить информацию о типе Fire', () => {
    cy.allure().step('Получить информацию о типе Fire')
    cy.request('GET', `${baseUrl}/type/fire`).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq('fire')
      expect(response.body.pokemon).to.be.an('array').and.not.empty
    })
  })
})
