import { allureStep } from '../utils/allure'
import { toSlug } from '../utils/helpers'

class ProductsPage {
  addProductToCart(productName: string) {
    const slug = toSlug(productName)
    allureStep(`Добавить товар "${productName}" в корзину`)
    cy.get(`[data-test="add-to-cart-${slug}"]`).should('be.visible').click()
  }

  sortProducts(sortOption: string) {
    allureStep(`Установить сортировку: ${sortOption}`)
    cy.get('[data-test="product-sort-container"]').select(sortOption)
  }

  checkItemsVisible() {
    allureStep('Проверить что товары отображаются на странице')
    cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0).first().should('be.visible')
  }

  checkAllPricesHaveCorrectFormat() {
    allureStep('Проверить формат цен всех товаров')
    cy.get('[data-test="inventory-item-price"]')
      .should('have.length.greaterThan', 0)
      .each(($price) => {
        cy.wrap($price).invoke('text').should('match', /^\$\d+\.\d{2}$/)
      })
  }

  checkSortedByNameAsc() {
    allureStep('Проверить сортировку по названию A→Z')
    cy.get('[data-test="inventory-item-name"]').then(($names) => {
      const names = [...$names].map((el) => el.innerText)
      expect(names).to.deep.equal([...names].sort())
    })
  }

  checkSortedByNameDesc() {
    allureStep('Проверить сортировку по названию Z→A')
    cy.get('[data-test="inventory-item-name"]').then(($names) => {
      const names = [...$names].map((el) => el.innerText)
      expect(names).to.deep.equal([...names].sort().reverse())
    })
  }

  checkSortedByPriceAsc() {
    allureStep('Проверить сортировку по цене: низкая → высокая')
    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')))
      expect(prices).to.deep.equal([...prices].sort((a, b) => a - b))
    })
  }

  checkSortedByPriceDesc() {
    allureStep('Проверить сортировку по цене: высокая → низкая')
    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')))
      expect(prices).to.deep.equal([...prices].sort((a, b) => b - a))
    })
  }
}

export default new ProductsPage()
