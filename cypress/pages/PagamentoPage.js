// Página /payment e confirmação /payment_done
class PagamentoPage {
  elementos = {
    nomeCartao: () => cy.get('[data-qa="name-on-card"]'),
    numeroCartao: () => cy.get('[data-qa="card-number"]'),
    cvc: () => cy.get('[data-qa="cvc"]'),
    mesValidade: () => cy.get('[data-qa="expiry-month"]'),
    anoValidade: () => cy.get('[data-qa="expiry-year"]'),
    botaoPagar: () => cy.get('[data-qa="pay-button"]'),
    pedidoRealizado: () => cy.get('[data-qa="order-placed"]')
  }

  pagar(cartao) {
    this.elementos.nomeCartao().type(cartao.nome)
    this.elementos.numeroCartao().type(cartao.numero, { log: false })
    this.elementos.cvc().type(cartao.cvc, { log: false })
    this.elementos.mesValidade().type(cartao.mes)
    this.elementos.anoValidade().type(cartao.ano)
    this.elementos.botaoPagar().click()
  }

  validarPedidoConfirmado() {
    cy.location('pathname').should('include', '/payment_done')
    this.elementos.pedidoRealizado().should('be.visible').and('contain', 'Order Placed!')
    cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible')
  }
}

export default new PagamentoPage()
