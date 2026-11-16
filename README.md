# Bella Flor — protótipo demonstrativo não oficial

**Protótipo demonstrativo não oficial.** Estudo independente, sem vínculo, encomenda ou aprovação da Bella Flor. A direção visual é sugerida. Não publicar este projeto como site oficial.

Apresentação pública autorizada pelo usuário: https://gavazzi5456.github.io/bella-flor-prototipo/ — sem senha, para avaliação como conceito demonstrativo.

## Iniciar

Requer Node.js 22.18+ (testado com 26.13.1), npm e, para os testes de navegador, Google Chrome instalado.

```powershell
npm install
npm run dev
```

Abra http://127.0.0.1:5173/. O servidor local escuta apenas no endereço de loopback. A configuração de GitHub Pages está preparada em `.github/workflows/deploy.yml`; a publicação depende de criar o repositório e habilitar Pages com GitHub Actions. O usuário autorizou uma apresentação pública, sem senha, nesta conversa. O `noindex` é uma precaução complementar: não torna o site privado nem garante ausência nos buscadores. Consulte `docs/github-pages.md`.

```powershell
npm test
npm run test:browser
npm run build
npm run preview
```

Para `test:browser`, mantenha `npm run dev` em outro terminal. `preview` serve o build local em http://127.0.0.1:4173/.

## Implementação

- Vite, React, TypeScript, Tailwind CSS 4 com tokens de tema e CSS editorial próprio. Sem biblioteca de animação ou ícones; setas SVG simples.
- Header, Hero, CategoryGrid, CategoryCard, HowItWorks, ConsultationBuilder, About, Location, Faq, Footer e DemoNotice separados por responsabilidade.
- Conteúdo, fatos, opções e redação da mensagem centralizados em `src/data/siteData.ts`.
- Seis categorias ilustrativas, navegação responsiva, FAQ nativo, preferências opcionais, prévia, cópia com feedback e seleção manual quando o clipboard é bloqueado.
- Estado apenas na memória da página; sem armazenamento, tracking, cadastro, backend, pedidos ou links de envio para WhatsApp.
- Campos de texto livre e dados de destinatário foram omitidos para manter a demonstração sem coleta de dados pessoais. O investimento é intenção do visitante, nunca preço comercial.
- Mapa esquemático próprio, identificado como ilustração sem escala. Google Maps abre somente por clique explícito; sem iframe ou API externa.
- Fotografias WebP e fontes locais, imagens abaixo da dobra com lazy loading, dimensões reservadas, foco visível, link de salto e preferência por movimento reduzido.

## Assets e direitos

Fotografias do Unsplash, com páginas individuais e licença consultadas. Fontes, autores, URLs e data da consulta estão em `public/image-credits.json`. A [licença Unsplash](https://unsplash.com/license) permite este uso. As fotos são apenas referências; não são produtos nem instalações atribuídos à Bella Flor. Nenhuma imagem ou logotipo da empresa foi utilizado.

Cormorant Garamond e Manrope são distribuídas via Fontsource. Licenças incluídas em `public/licenses/`.

O pacote ZIP não estava na pasta. Foram utilizados os quatro documentos já extraídos; não foi possível auditar a integridade do ZIP ausente. Nenhum repositório Git preexistente foi encontrado. Não houve commit, push ou publicação.

## Verificação

Ver `docs/verification.md`. Os relatórios automáticos e screenshots ficam em `output/playwright/` (artefatos locais ignorados pelo Git).

## Pendências comerciais

Confirmar responsável, telefone, perfil do Instagram, horários (especialmente sábado), identidade, fotos e textos autorizados, catálogo real e condições de entrega/retirada antes de uma eventual versão oficial. Este protótipo não estabelece políticas comerciais.

## Skills aplicadas

Design e conteúdo: `ui-ux-pro-max`, `frontend-design`, `copywriting` (brief fornecido como base, sem voz comercial aprovada).

Qualidade: `playwright`, `web-design-guidelines`, `verification-before-completion`.

Processo: `using-superpowers`, `brainstorming`, `writing-plans`, `executing-plans`, `test-driven-development`, `systematic-debugging` e `requesting-code-review`. A solicitação explícita de execução autônoma prevaleceu sobre etapas de perguntas/aprovação; não houve parada para confirmação nem commits.
