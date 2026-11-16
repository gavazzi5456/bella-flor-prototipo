# Plano de implementação

Referências: `briefing.md`, `design-system.md`, `AGENTS.md`. Execução local autônoma solicitada; sem commits, publicação ou contato com a empresa.

## Direção

Vitrine editorial, alinhada à esquerda, com uma fotografia floral ampla no hero e enquadramentos verticais nas categorias. Marfim #F8F5EF, verde #274A42, tinta #252D2B, areia #D8C7AF e rosa #C48F91 apenas como superfície. Cormorant Garamond nos títulos e Manrope na interface, hospedadas localmente. Sem selo, símbolo ou logotipo inventado.

A alternativa de catálogo comercial foi descartada por ausência de produtos oficiais; uma landing page apenas institucional não demonstraria o fluxo solicitado. A solução escolhida combina categorias e um compositor local.

## Etapas

- [x] Instalar React, TypeScript, Vite e Tailwind; registrar licenças dos assets.
- [x] Centralizar conteúdo em `src/data/siteData.ts`; testar geração segura da mensagem.
- [x] Implementar componentes semânticos e layout mobile-first.
- [x] Implementar seleção de categoria, preferências, prévia, cópia e recuperação quando clipboard falhar.
- [x] Revisar interface e conteúdo; testar navegação, formulário, imagens, acessibilidade, 375/1440 px e console.
- [x] Executar build e documentar evidências, pendências e comando local.

## Revisão

Testar escolhas vazias, troca de categoria após editar, texto longo, bloqueio do clipboard e retorno ao mobile. Nenhum campo pessoal, persistência, backend ou envio externo. Mapa será esquemático e identificado; link de busca abre Maps apenas por ação explícita.
