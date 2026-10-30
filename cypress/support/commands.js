// Comandos customizados usados para preparar e limpar a massa de dados via API.
// A API pública do site está documentada em https://automationexercise.com/api_list

const lerCorpo = (resposta) =>
  typeof resposta.body === 'string' ? JSON.parse(resposta.body) : resposta.body

/**
 * Cria um usuário via API (pré-condição de testes que precisam de conta existente).
 * @param {object} usuario objeto gerado por gerarUsuario()
 */
Cypress.Commands.add('criarUsuarioViaApi', (usuario) => {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      title: usuario.titulo,
      birth_date: usuario.nascimento.dia,
      birth_month: usuario.nascimento.mes,
      birth_year: usuario.nascimento.ano,
      firstname: usuario.primeiroNome,
      lastname: usuario.sobrenome,
      company: usuario.empresa,
      address1: usuario.endereco,
      address2: usuario.complemento,
      country: usuario.pais,
      zipcode: usuario.cep,
      state: usuario.estado,
      city: usuario.cidade,
      mobile_number: usuario.celular
    }
  }).then((resposta) => {
    const corpo = lerCorpo(resposta)
    expect(corpo.responseCode, 'usuário criado via API').to.eq(201)
  })
})

/**
 * Exclui um usuário via API. Usado na limpeza (afterEach); não falha se o
 * usuário já tiver sido excluído pelo próprio teste.
 */
Cypress.Commands.add('excluirUsuarioViaApi', (usuario) => {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    failOnStatusCode: false,
    body: {
      email: usuario.email,
      password: usuario.senha
    }
  })
})
