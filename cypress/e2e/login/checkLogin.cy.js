import loginPage from '../../support/pages/loginPage'

describe('Авторизация', () => {
  beforeEach(() => {
    loginPage.visitLoginPage()
  })

  it('Успешный вход с корректными данными', () => {
    loginPage.login()
    loginPage.checkSuccessfulLogin()
  })

  it('Ошибка при вводе неверного пароля', () => {
    loginPage.loginExpectError('standard_user', 'wrong_password')
    loginPage.checkLoginError('Username and password do not match')
    loginPage.checkLoginFailed()
  })

  it('Ошибка при входе заблокированным пользователем', () => {
    loginPage.loginExpectError('locked_out_user', 'secret_sauce')
    loginPage.checkLoginError('Sorry, this user has been locked out')
    loginPage.checkLoginFailed()
  })

  it('Ошибка при пустом имени пользователя', () => {
    loginPage.submitEmptyForm()
    loginPage.checkLoginError('Username is required')
  })
})
