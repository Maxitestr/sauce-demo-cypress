import { allureStep } from '../utils/allure'

class CheckoutPage {
  fillCustomerInfo(firstName = 'John', lastName = 'Doe', zip = '12345') {
    allureStep('Заполнить данные покупателя')
    cy.get('[data-test="firstName"]').clear()
    cy.get('[data-test="firstName"]').type(firstName)
    cy.get('[data-test="lastName"]').clear()
    cy.get('[data-test="lastName"]').type(lastName)
    cy.get('[data-test="postalCode"]').clear()
    cy.get('[data-test="postalCode"]').type(zip)
  }

  clickContinue() {
    allureStep('Нажать кнопку Continue')
    cy.get('[data-test="continue"]').click()
  }

  checkOverviewPage() {
    allureStep('Проверить страницу обзора заказа')
    cy.get('span.title').should('contain.text', 'Checkout: Overview')
  }

  clickFinish() {
    allureStep('Нажать кнопку Finish')
    cy.get('[data-test="finish"]').click()
  }

  checkOrderConfirmed() {
    allureStep('Проверить подтверждение заказа')
    cy.get('span.title').should('contain.text', 'Checkout: Complete!')
    cy.get('.complete-header').should('contain.text', 'Thank you for your order!')
  }
}

export default new CheckoutPage()
