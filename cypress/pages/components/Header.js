// Menu superior, presente em todas as páginas
class Header {
  elementos = {
    menu: () => cy.get('.shop-menu'),
    linkProdutos: () => cy.get('.shop-menu a[href="/products"]'),
    linkCarrinho: () => cy.get('.shop-menu a[href="/view_cart"]'),
    linkLogin: () => cy.get('.shop-menu a[href="/login"]'),
    linkLogout: () => cy.get('.shop-menu a[href="/logout"]'),
    linkExcluirConta: () => cy.get('.shop-menu a[href="/delete_account"]'),
    usuarioLogado: () => cy.get('.shop-menu').contains('a', 'Logged in as')
  }

  irParaProdutos() {
    this.elementos.linkProdutos().click()
  }

  irParaCarrinho() {
    this.elementos.linkCarrinho().click()
  }

  irParaLogin() {
    this.elementos.linkLogin().click()
  }

  sair() {
    this.elementos.linkLogout().click()
  }

  excluirConta() {
    this.elementos.linkExcluirConta().click()
  }

  validarUsuarioLogado(nome) {
    this.elementos.usuarioLogado().should('be.visible').and('contain', nome)
  }
}

export default new Header()
