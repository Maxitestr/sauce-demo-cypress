import loginPage from '../../support/pages/loginPage'
import productsPage from '../../support/pages/productsPage'
import cartPage from '../../support/pages/cartPage'

describe('Пользовательский путь: добавление и удаление товара', () => {
  const productName = 'Sauce Labs Backpack'

  beforeEach(() => {
    loginPage.visitLoginPage()
    loginPage.login()
  })

  it('Добавляем товар в корзину и удаляем его', () => {
    productsPage.addProductToCart(productName)
    cartPage.visitCartPage()
    cartPage.checkItemExists(productName)
    cartPage.removeItem(productName)
    cartPage.checkCartEmpty()
  })
})
