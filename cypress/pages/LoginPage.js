// Página /login: contém o formulário de login e o início do cadastro (New User Signup)
class LoginPage {
  elementos = {
    tituloLogin: () => cy.get('.login-form h2'),
    emailLogin: () => cy.get('[data-qa="login-email"]'),
    senhaLogin: () => cy.get('[data-qa="login-password"]'),
    botaoLogin: () => cy.get('[data-qa="login-button"]'),
    erroLogin: () => cy.get('.login-form form p'),

    tituloCadastro: () => cy.get('.signup-form h2'),
    nomeCadastro: () => cy.get('[data-qa="signup-name"]'),
    emailCadastro: () => cy.get('[data-qa="signup-email"]'),
    botaoCadastro: () => cy.get('[data-qa="signup-button"]'),
    erroCadastro: () => cy.get('.signup-form form p')
  }

  validarPaginaLogin() {
    cy.location('pathname').should('eq', '/login')
    this.elementos.tituloLogin().should('be.visible').and('contain', 'Login to your account')
  }

  validarFormularioCadastroVisivel() {
    this.elementos.tituloCadastro().should('be.visible').and('contain', 'New User Signup!')
  }

  login(email, senha) {
    this.elementos.emailLogin().type(email)
    this.elementos.senhaLogin().type(senha, { log: false })
    this.elementos.botaoLogin().click()
  }

  iniciarCadastro(nome, email) {
    this.elementos.nomeCadastro().type(nome)
    this.elementos.emailCadastro().type(email)
    this.elementos.botaoCadastro().click()
  }

  validarErroLogin() {
    this.elementos
      .erroLogin()
      .should('be.visible')
      .and('contain', 'Your email or password is incorrect!')
  }

  validarErroEmailExistente() {
    this.elementos
      .erroCadastro()
      .should('be.visible')
      .and('contain', 'Email Address already exist!')
  }
}

export default new LoginPage()
