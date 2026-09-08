import loginPage from '../../support/pages/loginPage'
import productsPage from '../../support/pages/productsPage'
import cartPage from '../../support/pages/cartPage'

const cartItem = {
  title: 'Sauce Labs Backpack',
  price: '$29.99',
}

describe('Отображение корзины с товаром', () => {
  beforeEach(() => {
    loginPage.visitLoginPage()
    loginPage.login()
    productsPage.addProductToCart(cartItem.title)
    cartPage.visitCartPage()
  })

  it('Проверяет содержимое корзины после добавления товара', () => {
    cartPage.checkItemExists(cartItem.title)
    cartPage.checkItemPrice(cartItem.title, cartItem.price)
    cartPage.checkCheckoutButton()
  })
})
