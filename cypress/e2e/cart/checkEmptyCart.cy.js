import loginPage from '../../support/pages/loginPage'
import cartPage from '../../support/pages/cartPage'

describe('Отображение пустой корзины', () => {
  beforeEach(() => {
    loginPage.visitLoginPage()
    loginPage.login()
    cartPage.visitCartPage()
  })

  it('Проверка отображения пустой корзины', () => {
    cartPage.checkCartEmpty()
  })
})
