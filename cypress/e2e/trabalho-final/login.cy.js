import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import ContaPage from '../../pages/ContaPage'
import Header from '../../pages/components/Header'
import { gerarUsuario } from '../../support/factories/usuario'

describe('Login e logout', () => {
  let usuario

  beforeEach(() => {
    usuario = gerarUsuario()
    HomePage.acessar()
    HomePage.validarPaginaVisivel()
    Header.irParaLogin()
    LoginPage.validarPaginaLogin()
  })

  afterEach(() => {
    cy.excluirUsuarioViaApi(usuario)
  })

  it('TC02 - Login com e-mail e senha corretos', () => {
    cy.criarUsuarioViaApi(usuario)

    LoginPage.login(usuario.email, usuario.senha)
    Header.validarUsuarioLogado(usuario.nome)

    Header.excluirConta()
    ContaPage.validarContaExcluida()
  })

  it('TC03 - Login com e-mail e senha incorretos', () => {
    // O usuário gerado não é criado, então as credenciais são inválidas
    LoginPage.login(usuario.email, usuario.senha)
    LoginPage.validarErroLogin()
  })

  it('TC04 - Logout do usuário', () => {
    cy.criarUsuarioViaApi(usuario)

    LoginPage.login(usuario.email, usuario.senha)
    Header.validarUsuarioLogado(usuario.nome)

    Header.sair()
    LoginPage.validarPaginaLogin()
  })
})
