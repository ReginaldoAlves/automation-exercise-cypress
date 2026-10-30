import 'cypress-mochawesome-reporter/register'
import './commands'

// Erros vindos de scripts de terceiros (anúncios/analytics) não devem quebrar os testes.
// Erros da própria aplicação continuam falhando normalmente.
const ERROS_DE_TERCEIROS = ['adsbygoogle', 'googletag', 'Script error', 'gtag']

Cypress.on('uncaught:exception', (erro) => {
  if (ERROS_DE_TERCEIROS.some((trecho) => erro.message.includes(trecho))) {
    return false
  }
  return true
})
