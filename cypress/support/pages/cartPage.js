class CartPage {
  visitCartPage() {
    cy.allure().step('Перейти на страницу корзины')
    cy.get('[data-test="shopping-cart-link"]').should('be.visible').click()
    cy.get('span.title').should('contain.text', 'Your Cart')
  }

  checkItemExists(title) {
    cy.allure().step(`Проверить наличие товара "${title}" в корзине`)
    cy.contains('.cart_item', title).should('be.visible')
  }

  checkItemPrice(title, expectedPrice) {
    cy.allure().step(`Проверить цену товара "${title}"`)
    cy.contains('.cart_item', title).find('.inventory_item_price').should('have.text', expectedPrice)
  }

  removeItem(title) {
    const slug = title.toLowerCase().replace(/ /g, '-')
    cy.allure().step(`Удалить товар "${title}" из корзины`)
    cy.get(`[data-test="remove-${slug}"]`).click()
  }

  checkCartEmpty() {
    cy.allure().step('Проверить, что корзина пуста')
    cy.get('.cart_item').should('not.exist')
    cy.get('[data-test="continue-shopping"]').should('be.visible')
  }

  checkCheckoutButton() {
    cy.allure().step('Проверить кнопку Checkout')
    cy.get('[data-test="checkout"]').should('be.visible').and('be.enabled')
  }

  clickCheckout() {
    cy.allure().step('Нажать кнопку Checkout')
    cy.get('[data-test="checkout"]').click()
  }

  checkCartBadge(expectedCount) {
    cy.allure().step(`Проверить счётчик корзины: ${expectedCount}`)
    cy.get('[data-test="shopping-cart-badge"]').should('contain', String(expectedCount))
  }

  checkCartBadgeAbsent() {
    cy.allure().step('Проверить, что счётчик корзины отсутствует')
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  }
}

export default new CartPage()
