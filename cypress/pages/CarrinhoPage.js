// Página /view_cart
class CarrinhoPage {
  elementos = {
    breadcrumb: () => cy.get('.breadcrumbs .active'),
    tabela: () => cy.get('#cart_info_table'),
    linhaProduto: (idProduto) => cy.get(`#cart_info_table tr#product-${idProduto}`),
    botaoFinalizar: () => cy.contains('.check_out', 'Proceed To Checkout')
  }

  validarPaginaVisivel() {
    cy.location('pathname').should('eq', '/view_cart')
    this.elementos.breadcrumb().should('contain', 'Shopping Cart')
    this.elementos.tabela().should('be.visible')
  }

  validarProdutoNoCarrinho(idProduto) {
    this.elementos.linhaProduto(idProduto).should('be.visible')
  }

  finalizarCompra() {
    this.elementos.botaoFinalizar().click()
  }
}

export default new CarrinhoPage()
