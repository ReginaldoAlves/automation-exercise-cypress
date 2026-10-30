# Automation Exercise – Testes E2E com Cypress

Trabalho de conclusão da disciplina de Automação Web: automação dos casos de teste da página
[Test Cases](https://automationexercise.com/test_cases) do site **Automation Exercise**.

## Casos de teste automatizados

| Caso | Descrição | Spec |
|------|-----------|------|
| TC01 | Registrar usuário | `cadastro.cy.js` |
| TC02 | Login com e-mail e senha corretos | `login.cy.js` |
| TC03 | Login com e-mail e senha incorretos | `login.cy.js` |
| TC04 | Logout do usuário | `login.cy.js` |
| TC05 | Registrar usuário com e-mail já existente | `cadastro.cy.js` |
| TC08 | Verificar todos os produtos e a página de detalhes | `produtos.cy.js` |
| TC09 | Buscar produto | `produtos.cy.js` |
| TC10 | Verificar assinatura na página inicial | `assinatura.cy.js` |
| TC15 | Fazer pedido: cadastrar antes do checkout | `pedido.cy.js` |
| TC16 | Fazer pedido: login antes do checkout | `pedido.cy.js` |

## Tecnologias

- [Cypress](https://www.cypress.io/)
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) – relatório HTML
- [@faker-js/faker](https://fakerjs.dev/) – massa de dados dinâmica
- GitHub Actions – integração contínua

## Estrutura do projeto

```
.github/workflows/cypress.yml   # pipeline de CI
cypress/
├── e2e/trabalho-final/         # specs do trabalho (um arquivo por funcionalidade)
├── fixtures/                   # dados estáticos (termo de busca, produtos do pedido)
├── pages/                      # Page Objects (modularização)
│   └── components/             # componentes compartilhados (Header, Rodapé)
└── support/
    ├── commands.js             # comandos customizados (massa via API)
    ├── e2e.js                  # registro do reporter e tratamento de exceções
    └── factories/usuario.js    # geração de usuário e cartão fictícios
cypress.config.js
```

## Boas práticas adotadas

- **Page Object Model**: seletores e ações ficam nas classes de `cypress/pages`; as specs só descrevem o fluxo.
- **Seletores estáveis**: prioridade para atributos `data-qa` e `id` do próprio site; sem XPath e sem seletores frágeis por posição.
- **Testes independentes**: cada teste gera seu próprio usuário (Faker + timestamp) e não depende da ordem de execução.
- **Pré-condições via API**: usuários necessários para TC02, TC04, TC05 e TC16 são criados pela API pública (`/api/createAccount`), deixando o teste focado no comportamento validado.
- **Limpeza de massa**: `afterEach` exclui o usuário via API (`/api/deleteAccount`), mesmo se o teste falhar no meio.
- **Estabilidade**: domínios de anúncios bloqueados (`blockHosts`), timeouts ajustados e `retries` no modo `run`.
- **Sem esperas fixas**: nenhum `cy.wait(<ms>)`; as asserções do Cypress aguardam os elementos.

## Como executar

Pré-requisito: Node.js 20 ou superior.

```bash
npm install
npm test            # executa as specs do trabalho em modo headless
npm run cy:open     # abre o Cypress em modo interativo
```

## Relatório

Após a execução, o relatório HTML fica em `cypress/reports/html/index.html`.

No GitHub Actions, o relatório é publicado como artefato **relatorio-mochawesome** ao final de cada
execução (aba *Actions* → execução → seção *Artifacts*). Em caso de falha, os screenshots também
são publicados.
