// Página /signup: "Enter Account Information" + "Address Information"
class CadastroPage {
  elementos = {
    tituloSr: () => cy.get('#id_gender1'),
    senha: () => cy.get('[data-qa="password"]'),
    dia: () => cy.get('[data-qa="days"]'),
    mes: () => cy.get('[data-qa="months"]'),
    ano: () => cy.get('[data-qa="years"]'),
    newsletter: () => cy.get('#newsletter'),
    ofertas: () => cy.get('#optin'),
    primeiroNome: () => cy.get('[data-qa="first_name"]'),
    sobrenome: () => cy.get('[data-qa="last_name"]'),
    empresa: () => cy.get('[data-qa="company"]'),
    endereco: () => cy.get('[data-qa="address"]'),
    complemento: () => cy.get('[data-qa="address2"]'),
    pais: () => cy.get('[data-qa="country"]'),
    estado: () => cy.get('[data-qa="state"]'),
    cidade: () => cy.get('[data-qa="city"]'),
    cep: () => cy.get('[data-qa="zipcode"]'),
    celular: () => cy.get('[data-qa="mobile_number"]'),
    botaoCriarConta: () => cy.get('[data-qa="create-account"]')
  }

  // cy.contains com o texto esperado refaz a busca até a nova página carregar,
  // evitando capturar o título da página anterior (/login) durante a navegação
  validarPaginaVisivel() {
    cy.location('pathname').should('eq', '/signup')
    cy.contains('.login-form h2', /enter account information/i).should('be.visible')
  }

  preencherInformacoesConta(usuario) {
    this.elementos.tituloSr().check()
    this.elementos.senha().type(usuario.senha, { log: false })
    this.elementos.dia().select(usuario.nascimento.dia)
    this.elementos.mes().select(usuario.nascimento.mes)
    this.elementos.ano().select(usuario.nascimento.ano)
    this.elementos.newsletter().check()
    this.elementos.ofertas().check()
  }

  preencherEndereco(usuario) {
    this.elementos.primeiroNome().type(usuario.primeiroNome)
    this.elementos.sobrenome().type(usuario.sobrenome)
    this.elementos.empresa().type(usuario.empresa)
    this.elementos.endereco().type(usuario.endereco)
    this.elementos.complemento().type(usuario.complemento)
    this.elementos.pais().select(usuario.pais)
    this.elementos.estado().type(usuario.estado)
    this.elementos.cidade().type(usuario.cidade)
    this.elementos.cep().type(usuario.cep)
    this.elementos.celular().type(usuario.celular)
  }

  criarConta() {
    this.elementos.botaoCriarConta().click()
  }
}

export default new CadastroPage()
