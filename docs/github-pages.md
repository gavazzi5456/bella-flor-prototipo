# Apresentação no GitHub Pages

O usuário autorizou publicar o protótipo no GitHub Pages em 16/11/2026, sem senha, para apresentar à empresa. Isso altera apenas a restrição anterior de apresentação privada; não constitui autorização ou afiliação da marca.

## Configuração preparada

- Vite com `base: "./"` e imagens que respeitam `import.meta.env.BASE_URL`, compatíveis com a pasta do repositório no Pages.
- Workflow `.github/workflows/deploy.yml`: Node 26, `npm ci`, `npm test`, `npm run build` e publicação de `dist` em pushes para `main` ou execução manual.
- Avisos visíveis de protótipo não oficial e de imagens ilustrativas preservados.
- Sem envio externo de mensagens, backend, coleta ou tracking.
- Meta `noindex, nofollow, noarchive` preservada, sem garantia de privacidade ou exclusão dos buscadores.

## Etapas na conta do usuário

1. Criar um repositório público para o protótipo, por exemplo `bella-flor-prototipo`, com descrição de conceito demonstrativo não oficial.
2. Enviar o código do projeto, incluindo `.github/workflows/deploy.yml`, `public`, `src`, os arquivos de configuração e o lockfile. Não enviar `node_modules`, `.env`, capturas de navegador ou diretórios de ferramentas.
3. Em Settings → Pages → Build and deployment → Source, selecionar GitHub Actions.
4. Aguardar o workflow e conferir a URL retornada pela etapa de publicação. Não tratar uma URL prevista como uma publicação concluída.
5. Verificar o link público e as imagens antes de compartilhar com a empresa.

Referência: https://vite.dev/guide/static-deploy.html#github-pages

## Verificação local desta preparação

Em 16/11/2026, o build passou, os dois testes de mensagem passaram e o teste de navegador passou em 60 verificações nas larguras de 375 e 1440 px. As mudanças de caminhos foram verificadas no servidor local; a URL pública ainda requer publicação e verificação.

## Estado

Publicação pendente: o conector GitHub identifica a conta `gavazzi5456`, mas não oferece criação de repositório ou configuração de Pages. O navegador de publicação solicitou login. Nenhum repositório ou link público foi criado nesta preparação.
