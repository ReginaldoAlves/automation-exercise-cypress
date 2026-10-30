// Rodapé com o formulário de assinatura (Subscription)
class Rodape {
  elementos = {
    tituloAssinatura: () => cy.get('footer .single-widget h2'),
    campoEmail: () => cy.get('#susbscribe_email'), // id com grafia original do site
    botaoAssinar: () => cy.get('#subscribe'),
    mensagemSucesso: () => cy.get('#success-subscribe')
  }

  rolarAteRodape() {
    cy.get('footer').scrollIntoView()
  }

  validarTituloAssinatura() {
    cy.contains('footer .single-widget h2', /subscription/i).should('be.visible')
  }

  assinar(email) {
    this.elementos.campoEmail().type(email)
    this.elementos.botaoAssinar().click()
  }

  validarAssinaturaRealizada() {
    this.elementos
      .mensagemSucesso()
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!')
  }
}

export default new Rodape()
