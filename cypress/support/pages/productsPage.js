class ProductsPage {
  addProductToCart(productName) {
    const slug = productName.toLowerCase().replace(/ /g, '-')
    cy.allure().step(`Добавить товар "${productName}" в корзину`)
    cy.get(`[data-test="add-to-cart-${slug}"]`).should('be.visible').click()
  }

  sortProducts(sortOption) {
    cy.allure().step(`Установить сортировку: ${sortOption}`)
    cy.get('[data-test="product-sort-container"]').select(sortOption)
  }

  checkItemsVisible() {
    cy.allure().step('Проверить что товары отображаются на странице')
    cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0).first().should('be.visible')
  }

  checkAllPricesHaveCorrectFormat() {
    cy.allure().step('Проверить формат цен всех товаров')
    cy.get('[data-test="inventory-item-price"]')
      .should('have.length.greaterThan', 0)
      .each(($price) => {
        cy.wrap($price).invoke('text').should('match', /^\$\d+\.\d{2}$/)
      })
  }

  checkSortedByNameAsc() {
    cy.allure().step('Проверить сортировку по названию A→Z')
    cy.get('[data-test="inventory-item-name"]').then(($names) => {
      const names = [...$names].map((el) => el.innerText)
      expect(names).to.deep.equal([...names].sort())
    })
  }

  checkSortedByNameDesc() {
    cy.allure().step('Проверить сортировку по названию Z→A')
    cy.get('[data-test="inventory-item-name"]').then(($names) => {
      const names = [...$names].map((el) => el.innerText)
      expect(names).to.deep.equal([...names].sort().reverse())
    })
  }

  checkSortedByPriceAsc() {
    cy.allure().step('Проверить сортировку по цене: низкая → высокая')
    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')))
      expect(prices).to.deep.equal([...prices].sort((a, b) => a - b))
    })
  }

  checkSortedByPriceDesc() {
    cy.allure().step('Проверить сортировку по цене: высокая → низкая')
    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')))
      expect(prices).to.deep.equal([...prices].sort((a, b) => b - a))
    })
  }
}

export default new ProductsPage()
