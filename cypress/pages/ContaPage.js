// Telas de confirmação "Account Created!" e "Account Deleted!"
class ContaPage {
  elementos = {
    contaCriada: () => cy.get('[data-qa="account-created"]'),
    contaExcluida: () => cy.get('[data-qa="account-deleted"]'),
    botaoContinuar: () => cy.get('[data-qa="continue-button"]')
  }

  validarContaCriada() {
    this.elementos.contaCriada().should('be.visible').and('contain', 'Account Created!')
  }

  validarContaExcluida() {
    this.elementos.contaExcluida().should('be.visible').and('contain', 'Account Deleted!')
  }

  continuar() {
    this.elementos.botaoContinuar().click()
  }
}

export default new ContaPage()
