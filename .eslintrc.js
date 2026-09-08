module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'commonjs'
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn'
  },
  overrides: [
    {
      files: ['cypress/**/*.js'],
      env: {
        'cypress/globals': true
      },
      extends: ['plugin:cypress/recommended'],
      plugins: ['cypress'],
      parserOptions: {
        sourceType: 'module'
      }
    }
  ]
}
