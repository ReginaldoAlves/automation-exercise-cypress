import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import CadastroPage from '../../pages/CadastroPage'
import ContaPage from '../../pages/ContaPage'
import CarrinhoPage from '../../pages/CarrinhoPage'
import CheckoutPage from '../../pages/CheckoutPage'
import PagamentoPage from '../../pages/PagamentoPage'
import Header from '../../pages/components/Header'
import { gerarUsuario, gerarCartao } from '../../support/factories/usuario'

describe('Fazer pedido', () => {
  let usuario
  let pedido

  before(() => {
    cy.fixture('pedido').then((dados) => {
      pedido = dados
    })
  })

  beforeEach(() => {
    usuario = gerarUsuario()
    HomePage.acessar()
    HomePage.validarPaginaVisivel()
  })

  afterEach(() => {
    cy.excluirUsuarioViaApi(usuario)
  })

  // Passos comuns aos dois casos: do carrinho até a exclusão da conta
  const finalizarPedidoEExcluirConta = () => {
    pedido.produtos.forEach((id) => HomePage.adicionarProdutoAoCarrinho(id))

    Header.irParaCarrinho()
    CarrinhoPage.validarPaginaVisivel()
    pedido.produtos.forEach((id) => CarrinhoPage.validarProdutoNoCarrinho(id))
    CarrinhoPage.finalizarCompra()

    CheckoutPage.validarEndereco(usuario)
    CheckoutPage.validarRevisaoPedido(pedido.produtos)
    CheckoutPage.comentarEFazerPedido(pedido.comentario)

    PagamentoPage.pagar(gerarCartao(usuario.nome))
    PagamentoPage.validarPedidoConfirmado()

    Header.excluirConta()
    ContaPage.validarContaExcluida()
    ContaPage.continuar()
  }

  it('TC15 - Fazer pedido: cadastrar antes do checkout', () => {
    Header.irParaLogin()
    LoginPage.iniciarCadastro(usuario.nome, usuario.email)
    CadastroPage.validarPaginaVisivel()
    CadastroPage.preencherInformacoesConta(usuario)
    CadastroPage.preencherEndereco(usuario)
    CadastroPage.criarConta()
    ContaPage.validarContaCriada()
    ContaPage.continuar()
    Header.validarUsuarioLogado(usuario.nome)

    finalizarPedidoEExcluirConta()
  })

  it('TC16 - Fazer pedido: login antes do checkout', () => {
    cy.criarUsuarioViaApi(usuario)

    Header.irParaLogin()
    LoginPage.login(usuario.email, usuario.senha)
    Header.validarUsuarioLogado(usuario.nome)

    finalizarPedidoEExcluirConta()
  })
})
