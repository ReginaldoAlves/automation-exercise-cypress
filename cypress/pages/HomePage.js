class HomePage {
  elementos = {
    carrossel: () => cy.get('#slider'),
    produtos: () => cy.get('.features_items'),
    botaoAdicionar: (idProduto) =>
      cy.get(`.features_items .productinfo a.add-to-cart[data-product-id="${idProduto}"]`),
    modalCarrinho: () => cy.get('#cartModal'),
    botaoContinuarComprando: () => cy.get('#cartModal .close-modal')
  }

  acessar() {
    cy.visit('/')
  }

  validarPaginaVisivel() {
    cy.title().should('eq', 'Automation Exercise')
    this.elementos.carrossel().should('be.visible')
    this.elementos.produtos().should('be.visible')
  }

  adicionarProdutoAoCarrinho(idProduto) {
    this.elementos.botaoAdicionar(idProduto).scrollIntoView().click()
    this.elementos.modalCarrinho().should('be.visible').and('contain', 'Added!')
    this.elementos.botaoContinuarComprando().click()
    this.elementos.modalCarrinho().should('not.be.visible')
  }
}

export default new HomePage()
