# Cypress тестовый проект

Автоматизированный Cypress-проект с интеграцией Allure Report и CI/CD через GitHub Actions, включающий два типа тестирования:

- **E2E-тесты** — покрывают UI [Sauce Labs Demo App](https://www.saucedemo.com), реализованы по паттерну **Page Object Model**
- **API-тесты** — покрывают публичный [PokéAPI](https://pokeapi.co)

## Ссылка на Allure отчет

[Открыть Allure отчет](https://maxitestr.github.io/sauce-demo-cypress/)

## Стек технологий

- **Cypress** 15.14.2 — E2E-тестирование
- **@shelex/cypress-allure-plugin** 2.41.2 — интеграция с Allure
- **Allure CLI** 2.40.0 — генерация отчётов
- **ESLint + Prettier** — качество и форматирование кода
- **GitHub Actions** — CI/CD с публикацией отчёта на GitHub Pages
- **Node.js** 20+

## Структура проекта

```
cypress/
├── e2e/                   # UI-тесты End-to-End
│   ├── cart/
│   │   ├── checkAddDeleteUserPath.cy.ts   # Добавление и удаление товара
│   │   ├── checkCartWithItem.cy.ts        # Содержимое корзины
│   │   ├── checkCheckoutFlow.cy.ts        # Полный флоу оформления заказа
│   │   └── checkEmptyCart.cy.ts           # Пустая корзина
│   ├── login/
│   │   └── checkLogin.cy.ts               # Позитивные и негативные сценарии входа
│   └── products/
│       └── checkProductsSorting.cy.ts     # Каталог: отображение и сортировка
├── api/
│   └── pokemon.cy.ts      # API-тесты (PokeAPI)
└── support/
    ├── e2e.js             # Глобальная настройка тестов
    └── pages/             # Page Object Model
        ├── loginPage.js   # Страница авторизации
        ├── productsPage.js # Каталог товаров
        ├── cartPage.js    # Корзина
        └── checkoutPage.js # Оформление заказа
```

## Обзор тестов

### E2E тесты — корзина (5 спецификаций)

| Файл                     | Что проверяется                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `checkAddDeleteUserPath` | Добавить товар → перейти в корзину → удалить → корзина пуста                            |
| `checkCartWithItem`      | Название, цена товара в корзине; кнопка Checkout активна                                |
| `checkCheckoutFlow`      | Полный happy-path: от добавления товара до «Thank you for your order!»; счётчик корзины |
| `checkEmptyCart`         | Пустая корзина отображается корректно                                                   |
| `checkProductsSorting`   | Наличие товаров и цен; сортировка A→Z, Z→A, price low→high, high→low                    |

### E2E тесты — авторизация (1 спецификация)

| Файл         | Что проверяется                                                                  |
| ------------ | -------------------------------------------------------------------------------- |
| `checkLogin` | Успешный вход; неверный пароль; заблокированный пользователь; пустое поле логина |

### API тесты (4 проверки)

| Эндпоинт                 | Что проверяется                        |
| ------------------------ | -------------------------------------- |
| `GET /pokemon/bulbasaur` | Статус 200, имя, ID, массив abilities  |
| `GET /pokemon/0`         | Статус 404 для невалидного ID          |
| `GET /pokemon?limit=10`  | Список из 10 покемонов                 |
| `GET /type/fire`         | Статус 200, имя типа, массив покемонов |

## Установка

```bash
npm install
```

## Запуск тестов

### Локальный запуск

```bash
# Все тесты (headless)
npm run cy:run

# Только E2E
npm run cy:run:e2e

# Только API
npm run cy:run:api

# Интерактивный режим
npm run cy:open
```

### Один файл

```bash
npx cypress run --spec "cypress/e2e/login/checkLogin.cy.ts"
```

## Allure отчет

```bash
# Запустить тесты и сразу сгенерировать отчёт
npm run test:allure

# Только генерация
npm run allure:generate

# Открыть отчёт
npm run allure:open
```

## Линтинг и форматирование

```bash
# Проверить код
npm run lint

# Авто-исправление
npm run lint:fix

# Форматирование Prettier
npm run format
```

## CI/CD на GitHub Actions

Пайплайн разделён на три джобы:

1. **E2E Tests** — UI-тесты, сохраняют артефакт `allure-results-e2e`
2. **API Tests** — API-тесты, сохраняют артефакт `allure-results-api`
3. **Generate Report** — скачивает оба артефакта, объединяет их и генерирует единый Allure-отчёт, который публикуется на GitHub Pages

## Page Object архитектура

| Класс          | Файл              | Зона ответственности                                                   |
| -------------- | ----------------- | ---------------------------------------------------------------------- |
| `LoginPage`    | `loginPage.js`    | Открытие страницы, позитивный и негативные сценарии входа              |
| `ProductsPage` | `productsPage.js` | Добавление товаров в корзину, сортировка каталога                      |
| `CartPage`     | `cartPage.js`     | Переход в корзину, проверки содержимого, счётчик, переход к оформлению |
| `CheckoutPage` | `checkoutPage.js` | Заполнение формы, шаги оформления до подтверждения заказа              |

## Данные для входа

| Пользователь      | Пароль         | Описание                              |
| ----------------- | -------------- | ------------------------------------- |
| `standard_user`   | `secret_sauce` | Стандартный пользователь              |
| `locked_out_user` | `secret_sauce` | Заблокированный (негативный сценарий) |
