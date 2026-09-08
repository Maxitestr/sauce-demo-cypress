import loginPage from '../../support/pages/loginPage'
import productsPage from '../../support/pages/productsPage'
import cartPage from '../../support/pages/cartPage'
import checkoutPage from '../../support/pages/checkoutPage'

describe('Процесс оформления заказа', () => {
  const productName = 'Sauce Labs Bolt T-Shirt'
  const secondProductName = 'Sauce Labs Bike Light'

  beforeEach(() => {
    loginPage.visitLoginPage()
    loginPage.login()
  })

  it('Пользователь может завершить оформление заказа', () => {
    productsPage.addProductToCart(productName)
    cartPage.visitCartPage()
    cartPage.checkItemExists(productName)
    cartPage.checkCheckoutButton()
    cartPage.clickCheckout()
    checkoutPage.fillCustomerInfo()
    checkoutPage.clickContinue()
    checkoutPage.checkOverviewPage()
    checkoutPage.clickFinish()
    checkoutPage.checkOrderConfirmed()
  })

  it('Счётчик корзины обновляется при добавлении товаров', () => {
    cartPage.checkCartBadgeAbsent()

    productsPage.addProductToCart(productName)
    cartPage.checkCartBadge(1)

    productsPage.addProductToCart(secondProductName)
    cartPage.checkCartBadge(2)
  })
})
