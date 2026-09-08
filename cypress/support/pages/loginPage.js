class LoginPage {
  visitLoginPage() {
    cy.allure().step('Открыть страницу входа Sauce Demo')
    cy.visit('/')
    cy.get('[data-test="username"]').should('be.visible')
  }

  login(username = 'standard_user', password = 'secret_sauce') {
    cy.allure().step('Авторизоваться')
    cy.get('[data-test="username"]').clear()
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').clear()
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.get('.inventory_list').should('be.visible')
  }

  // Заполняет форму и отправляет, не проверяя результат — для негативных сценариев
  loginExpectError(username, password) {
    cy.allure().step('Попытка входа с некорректными данными')
    cy.get('[data-test="username"]').clear()
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').clear()
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
  }

  // Нажимает кнопку входа без заполнения полей — для проверки валидации пустых полей
  submitEmptyForm() {
    cy.allure().step('Нажать кнопку входа с пустыми полями')
    cy.get('[data-test="login-button"]').click()
  }

  checkSuccessfulLogin() {
    cy.allure().step('Проверить успешный вход')
    cy.get('.inventory_list').should('be.visible')
    cy.url().should('include', '/inventory')
  }

  checkLoginFailed() {
    cy.allure().step('Проверить что вход не выполнен')
    cy.url().should('not.include', '/inventory')
  }

  checkLoginError(expectedMessage) {
    cy.allure().step('Проверить сообщение об ошибке авторизации')
    cy.get('[data-test="error"]').should('be.visible').and('contain.text', expectedMessage)
  }
}

export default new LoginPage()
