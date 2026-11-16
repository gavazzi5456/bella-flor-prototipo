# Verificação local — 16/11/2026

## Evidências executadas

- Instalação de dependências concluída; `npm audit`: 0 vulnerabilidades reportadas.
- `npm test`: 2 testes aprovados, cobrindo mensagem vazia segura e preferências tratadas como intenções, com data em pt-BR.
- `npm run test:browser`: 60 verificações aprovadas em Chrome automatizado, nas viewports 1440×1000 e 375×1000.
- `npm run build`: TypeScript e build Vite aprovados. JavaScript ~240 kB (75 kB gzip); CSS ~21 kB (5,5 kB gzip). Medidas do build, não um benchmark de carregamento.
- Revisão visual das capturas do hero mobile, página desktop e compositor desktop.
- Build final aberto com Playwright em `http://127.0.0.1:4173/`: título e página carregados, console sem erros ou avisos. Licenças locais incluídas no build.
- Revisão independente do código por um agente somente leitura: nenhum achado relevante. Não houve repetição dos testes por esse revisor.

## Fluxos verificados no navegador

Navegação por âncoras; menu mobile com abertura, fechamento por seleção e Escape com restauração de foco; seis categorias refletidas no formulário; ocasião, cores, estilo, investimento e data refletidos na prévia; cópia real comparada com o clipboard (normalizando CRLF do Windows); remoção de feedback obsoleto após edição; limpeza; recuperação de cópia bloqueada com texto selecionado; FAQ pelo teclado; link de salto como primeiro foco; reduced motion; oito imagens carregadas; ausência de overflow horizontal; âncoras existentes; URL explícita de Maps; ausência de links de envio, cookies e storage.

O teste observou **0 requisições externas**, **0 recursos HTTP com erro** e **0 erros de console/JavaScript** durante o fluxo. Não acionou Maps, telefone, Instagram ou WhatsApp.

O axe não detectou violações nos conjuntos WCAG 2 A/AA e 2.1 A/AA testados em ambas as larguras. Isso é uma verificação automática básica, não certificação de conformidade integral.

## Correções durante a revisão

- Removido aria-label redundante do nome tipográfico, apontado pelo axe como incompatível com o texto visível.
- Favicon vazio declarado para evitar requisição 404.
- Feedback de cópia vinculado à versão da mensagem, evitando confirmação de texto já editado.
- Harness ajustado para nomes dinâmicos do menu e quebras de linha nativas do clipboard do Windows.

## Limites e pendências

- Sem testes em dispositivos físicos, Safari, Firefox ou leitor de tela.
- Sem Lighthouse ou medição de Core Web Vitals em condições de produção.
- Google Maps verificado pela estrutura do destino, sem navegação externa; funcionamento do contato e dados públicos não foram revalidados.
- O mapa é esquemático; não serve para navegação geográfica.
- Autorização da marca, validação de informações e materiais oficiais continuam pendentes conforme `briefing.md`.
- A cópia depende das permissões do navegador; a seleção manual é o fallback implementado e testado.

Artefatos: `output/playwright/results.json`, `axe-375.json`, `axe-1440.json`, `hero-375.png`, `hero-1440.png`, `full-375.png`, `full-1440.png` e capturas do compositor.
