import HomePage from '../../pages/HomePage'
import Rodape from '../../pages/components/Rodape'
import { gerarUsuario } from '../../support/factories/usuario'

describe('Assinatura (Subscription)', () => {
  it('TC10 - Verificar assinatura na página inicial', () => {
    const { email } = gerarUsuario()

    HomePage.acessar()
    HomePage.validarPaginaVisivel()

    Rodape.rolarAteRodape()
    Rodape.validarTituloAssinatura()
    Rodape.assinar(email)
    Rodape.validarAssinaturaRealizada()
  })
})
