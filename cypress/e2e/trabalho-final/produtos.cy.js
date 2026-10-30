import HomePage from '../../pages/HomePage'
import ProdutosPage from '../../pages/ProdutosPage'
import Header from '../../pages/components/Header'

describe('Produtos', () => {
  beforeEach(() => {
    HomePage.acessar()
    HomePage.validarPaginaVisivel()
    Header.irParaProdutos()
    ProdutosPage.validarPaginaTodosProdutos()
  })

  it('TC08 - Verificar todos os produtos e a página de detalhes', () => {
    ProdutosPage.validarListaVisivel()
    ProdutosPage.abrirPrimeiroProduto()
    ProdutosPage.validarDetalhesProduto()
  })

  it('TC09 - Buscar produto', () => {
    cy.fixture('busca').then(({ termo }) => {
      ProdutosPage.buscar(termo)
      ProdutosPage.validarTituloBusca()
      ProdutosPage.validarResultadosRelacionados(termo)
    })
  })
})
