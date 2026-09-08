export function allureStep<T>(name: string, callback?: () => T): T | undefined {
  cy.allure().step(name, true)
  return callback ? callback() : undefined
}