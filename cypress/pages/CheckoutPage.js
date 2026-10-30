// Página /checkout: "Address Details" e "Review Your Order"
class CheckoutPage {
  elementos = {
    enderecoEntrega: () => cy.get('#address_delivery'),
    enderecoCobranca: () => cy.get('#address_invoice'),
    revisaoPedido: () => cy.get('#cart_info'),
    comentario: () => cy.get('textarea[name="message"]'),
    botaoFazerPedido: () => cy.get('a[href="/payment"]')
  }

  validarEndereco(usuario) {
    cy.location('pathname').should('eq', '/checkout')
    ;[this.elementos.enderecoEntrega, this.elementos.enderecoCobranca].forEach((bloco) => {
      bloco()
        .should('be.visible')
        .and('contain', `${usuario.primeiroNome} ${usuario.sobrenome}`)
        .and('contain', usuario.endereco)
        .and('contain', usuario.cidade)
        .and('contain', usuario.pais)
        .and('contain', usuario.celular)
    })
  }

  validarRevisaoPedido(idsProdutos) {
    this.elementos.revisaoPedido().should('be.visible')
    idsProdutos.forEach((id) => {
      cy.get(`#cart_info tr#product-${id}`).should('be.visible')
    })
  }

  comentarEFazerPedido(comentario) {
    this.elementos.comentario().type(comentario)
    this.elementos.botaoFazerPedido().click()
  }
}

export default new CheckoutPage()
