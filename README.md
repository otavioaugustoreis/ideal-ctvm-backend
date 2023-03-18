GraphQL API com Node.js e Apollo Server
Este é um projeto de uma API GraphQL que permite aos usuários criarem uma lista de ativos de sua preferência e adicioná-los a sua lista de acompanhamento. Além disso, os usuários também podem consultar os ativos de sua lista, bem como obter a cotação atualizada de um ativo específico.

A API foi construída utilizando Node.js e Apollo Server, e integra-se com a API de cotações do Yahoo! Finance para obter as cotações dos ativos.

Como executar o projeto
Para executar o projeto, siga os passos abaixo:

Clone o repositório para o seu computador;

Instale as dependências com o comando npm install;

Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

javascript
Copy code
YAHOO_FINANCE_API_KEY=<sua chave de API do Yahoo! Finance>
Certifique-se de substituir YOUR_YAHOO_API_KEY_HERE pela sua chave de API do Yahoo! Finance

Inicie o servidor com o comando npm run dev:simple;

No package.json, está o módulo do script alterado, para:

json
Copy code
"scripts": {
  "dev:simple": "tsnd --respawn --transpile-only simple-server.ts"
}
Para uma facilidade na hora de consultar uma API

Acesse a URL http://localhost:4000 em seu navegador ou ferramenta de API client (como o Insomnia ou Postman).

Funcionalidades da API
A API possui as seguintes funcionalidades:

users: retorna uma lista de todos os usuários cadastrados na API;

assets: retorna uma lista de todos os ativos disponíveis para consulta na API;

createUser: cria um novo usuário com base no nome fornecido na requisição;

addAsset: adiciona um ativo à lista de acompanhamento de um usuário específico;

userAssets: retorna a lista de ativos de acompanhamento de um usuário específico;

getAssetQuote: retorna a cotação atualizada de um ativo específico, mesmo que ele não esteja na lista de acompanhamento do usuário.

Tecnologias utilizadas
Node.js
Apollo Server
GraphQL
Jest (para testes unitários)
Docker (para containerização)
Yahoo! Finance API (para obter as cotações dos ativos)

Autor
Otavio Augusto - oaugusto265@gmail.com


