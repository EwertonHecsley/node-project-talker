# API Talker

A API Talker é uma aplicação para gerenciar informações sobre pessoas palestrantes. Ela oferece endpoints para listar palestrantes, adicionar, atualizar e excluir palestrantes, além de permitir pesquisar palestrantes por termos específicos. Além disso, há um endpoint de login para autenticar os usuários e fornecer um token de acesso para as operações protegidas.

## Endpoints

### 1. Listar Todas as Pessoas Palestrantes

* **Endpoint:** GET /talker
* **Descrição:** Retorna uma lista de todas as pessoas palestrantes cadastradas.
* **Campos de entrada:**
    * Nenhum
* **Campos de saída:**
    * `id`: O ID da pessoa palestrante
    * `name`: O nome da pessoa palestrante
    * `age`: A idade da pessoa palestrante
    * `talk`: Os dados da palestra da pessoa palestrante
    * `rate`: A avaliação da palestra da pessoa palestrante
* **Status de resposta:**
    * 200 OK: Retorna um array com todas as pessoas palestrantes cadastradas.
    * 200 OK: Se não houver pessoas palestrantes cadastradas, retorna um array vazio.

### 2. Obter uma Pessoa Palestrante por ID

* **Endpoint:** GET /talker/:id
* **Descrição:** Retorna uma pessoa palestrante com base no ID fornecido na rota.
* **Campos de entrada:**
    * `id`: O ID da pessoa palestrante
* **Campos de saída:**
    * Os mesmos campos de saída do endpoint `/talker`
* **Status de resposta:**
    * 200 OK: Retorna a pessoa palestrante encontrada.
    * 404 Not Found: Se não for encontrada uma pessoa palestrante com o ID fornecido.

### 3. Login e Geração de Token de Acesso

* **Endpoint:** POST /login
* **Descrição:** Recebe as credenciais de login (email e senha) e gera um token de acesso aleatório para autenticação futura.
* **Campos de entrada:**
    * `email`: O email do usuário
    * `senha`: A senha do usuário
* **Campos de saída:**
    * `token`: O token de acesso gerado
* **Status de resposta:**
    * 200 OK: Retorna o token de acesso gerado.
    * 400 Bad Request: Se as credenciais de login forem inválidas.

### 4. Autenticação

Para acessar os endpoints protegidos, inclua o token de acesso gerado durante o login no cabeçalho das requisições com a chave "Authorization".

Exemplo: Authorization: Bearer seu_token_de_acesso

### 5. Configuração e Execução

Para configurar e executar o projeto:

1. Clone o repositório para o seu ambiente local.
2. Instale as dependências usando o comando:

```
npm install
```

Configure as variáveis de ambiente necessárias, como a chave JWT e configurações do banco de dados.
Inicie a aplicação com o comando:
npm start


5. A aplicação estará disponível em http://localhost:3000 por padrão.





