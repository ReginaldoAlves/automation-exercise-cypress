// Páginas /products (lista e busca) e /product_details/:id
class ProdutosPage {
  elementos = {
    tituloLista: () => cy.get('.features_items h2.title'),
    cardsProdutos: () => cy.get('.features_items .product-image-wrapper'),
    nomesProdutos: () => cy.get('.features_items .productinfo p'),
    linkVerProduto: () => cy.get('.features_items a[href^="/product_details/"]'),
    campoBusca: () => cy.get('#search_product'),
    botaoBuscar: () => cy.get('#submit_search'),

    detalhes: () => cy.get('.product-information'),
    nomeProduto: () => cy.get('.product-information h2'),
    precoProduto: () => cy.get('.product-information span span')
  }

  validarPaginaTodosProdutos() {
    cy.location('pathname').should('eq', '/products')
    cy.contains('.features_items h2.title', /all products/i).should('be.visible')
  }

  validarListaVisivel() {
    this.elementos.cardsProdutos().should('have.length.greaterThan', 0).first().should('be.visible')
  }

  abrirPrimeiroProduto() {
    this.elementos.linkVerProduto().first().click()
  }

  validarDetalhesProduto() {
    cy.location('pathname').should('match', /^\/product_details\/\d+$/)
    this.elementos.nomeProduto().should('be.visible').and('not.be.empty')
    this.elementos.precoProduto().should('be.visible').and('contain', 'Rs.')
    this.elementos.detalhes().should('contain', 'Category:')
    this.elementos.detalhes().should('contain', 'Availability:')
    this.elementos.detalhes().should('contain', 'Condition:')
    this.elementos.detalhes().should('contain', 'Brand:')
  }

  buscar(termo) {
    this.elementos.campoBusca().type(termo)
    this.elementos.botaoBuscar().click()
  }

  validarTituloBusca() {
    // Espera o título mudar de "All Products" para "Searched Products" após a busca
    cy.contains('.features_items h2.title', /searched products/i).should('be.visible')
  }

  validarResultadosRelacionados(termo) {
    this.elementos.nomesProdutos().should('have.length.greaterThan', 0)
    this.elementos.nomesProdutos().each(($nome) => {
      expect($nome.text().toLowerCase()).to.contain(termo.toLowerCase())
    })
  }
}

export default new ProdutosPage()
