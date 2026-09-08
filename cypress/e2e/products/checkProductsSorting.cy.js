import loginPage from '../../support/pages/loginPage'
import productsPage from '../../support/pages/productsPage'

describe('Каталог товаров: отображение и сортировка', () => {
  beforeEach(() => {
    loginPage.visitLoginPage()
    loginPage.login()
  })

  it('Товары отображаются на странице и имеют корректный формат цен', () => {
    productsPage.checkItemsVisible()
    productsPage.checkAllPricesHaveCorrectFormat()
  })

  it('Сортировка по названию: от А до Я (A to Z)', () => {
    productsPage.sortProducts('az')
    productsPage.checkSortedByNameAsc()
  })

  it('Сортировка по названию: от Я до А (Z to A)', () => {
    productsPage.sortProducts('za')
    productsPage.checkSortedByNameDesc()
  })

  it('Сортировка по цене: от низкой к высокой', () => {
    productsPage.sortProducts('lohi')
    productsPage.checkSortedByPriceAsc()
  })

  it('Сортировка по цене: от высокой к низкой', () => {
    productsPage.sortProducts('hilo')
    productsPage.checkSortedByPriceDesc()
  })
})
