import { allureStep } from '../utils/allure'
import { toSlug } from '../utils/helpers'

class CartPage {
  visitCartPage() {
    allureStep('Перейти на страницу корзины')
    cy.get('[data-test="shopping-cart-link"]').should('be.visible').click()
    cy.get('span.title').should('contain.text', 'Your Cart')
  }

  checkItemExists(title: string) {
    allureStep(`Проверить наличие товара "${title}" в корзине`)
    cy.contains('.cart_item', title).should('be.visible')
  }

  checkItemPrice(title: string, expectedPrice: string) {
    allureStep(`Проверить цену товара "${title}"`)
    cy.contains('.cart_item', title).find('.inventory_item_price').should('have.text', expectedPrice)
  }

  removeItem(title: string) {
    const slug = toSlug(title)
    allureStep(`Удалить товар "${title}" из корзины`)
    cy.get(`[data-test="remove-${slug}"]`).click()
  }

  checkCartEmpty() {
    allureStep('Проверить, что корзина пуста')
    cy.get('.cart_item').should('not.exist')
    cy.get('[data-test="continue-shopping"]').should('be.visible')
  }

  checkCheckoutButton() {
    allureStep('Проверить кнопку Checkout')
    cy.get('[data-test="checkout"]').should('be.visible').and('be.enabled')
  }

  clickCheckout() {
    allureStep('Нажать кнопку Checkout')
    cy.get('[data-test="checkout"]').click()
  }

  checkCartBadge(expectedCount: number) {
    allureStep(`Проверить счётчик корзины: ${expectedCount}`)
    cy.get('[data-test="shopping-cart-badge"]').should('contain', String(expectedCount))
  }

  checkCartBadgeAbsent() {
    allureStep('Проверить, что счётчик корзины отсутствует')
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  }
}

export default new CartPage()
