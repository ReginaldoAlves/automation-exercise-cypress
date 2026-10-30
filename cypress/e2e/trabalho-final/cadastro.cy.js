import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import CadastroPage from '../../pages/CadastroPage'
import ContaPage from '../../pages/ContaPage'
import Header from '../../pages/components/Header'
import { gerarUsuario } from '../../support/factories/usuario'

describe('Cadastro de usuário', () => {
  let usuario

  beforeEach(() => {
    usuario = gerarUsuario()
    HomePage.acessar()
    HomePage.validarPaginaVisivel()
  })

  afterEach(() => {
    // Garante a limpeza da massa mesmo se o teste falhar no meio do fluxo
    cy.excluirUsuarioViaApi(usuario)
  })

  it('TC01 - Registrar usuário', () => {
    Header.irParaLogin()
    LoginPage.validarFormularioCadastroVisivel()
    LoginPage.iniciarCadastro(usuario.nome, usuario.email)

    CadastroPage.validarPaginaVisivel()
    CadastroPage.preencherInformacoesConta(usuario)
    CadastroPage.preencherEndereco(usuario)
    CadastroPage.criarConta()

    ContaPage.validarContaCriada()
    ContaPage.continuar()
    Header.validarUsuarioLogado(usuario.nome)

    Header.excluirConta()
    ContaPage.validarContaExcluida()
    ContaPage.continuar()
  })

  it('TC05 - Registrar usuário com e-mail já existente', () => {
    cy.criarUsuarioViaApi(usuario)

    Header.irParaLogin()
    LoginPage.validarFormularioCadastroVisivel()
    LoginPage.iniciarCadastro(usuario.nome, usuario.email)
    LoginPage.validarErroEmailExistente()
  })
})
