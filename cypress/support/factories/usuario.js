import { faker } from '@faker-js/faker'

/**
 * Gera um usuário com dados únicos a cada execução, evitando conflito
 * de e-mail entre execuções locais e no GitHub Actions.
 */
export function gerarUsuario() {
  const primeiroNome = faker.person.firstName().replace(/[^A-Za-z]/g, '')
  const sobrenome = faker.person.lastName().replace(/[^A-Za-z]/g, '')

  return {
    nome: `${primeiroNome} ${sobrenome}`,
    email: `qa.${Date.now()}.${faker.string.alphanumeric(6)}@teste.com`.toLowerCase(),
    senha: faker.internet.password({ length: 12 }),
    titulo: 'Mr',
    nascimento: { dia: '15', mes: '6', ano: '1992' },
    primeiroNome,
    sobrenome,
    empresa: faker.company.name().replace(/[^A-Za-z ]/g, ''),
    endereco: `${faker.location.streetAddress()}`.replace(/[^A-Za-z0-9 ]/g, ''),
    complemento: `Apt ${faker.number.int({ min: 1, max: 999 })}`,
    pais: 'Canada',
    estado: 'Ontario',
    cidade: 'Toronto',
    cep: faker.string.numeric(6),
    celular: faker.string.numeric(11)
  }
}

/** Dados fictícios de cartão para a etapa de pagamento. */
export function gerarCartao(nomeTitular) {
  return {
    nome: nomeTitular,
    numero: '4111111111111111',
    cvc: '123',
    mes: '12',
    ano: '2030'
  }
}
