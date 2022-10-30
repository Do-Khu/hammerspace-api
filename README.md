# hammerspace-api - stable v1

## Sobre o projeto

Este é um projeto de estudos de desenvolvimento de aplicações com a utilização de microserviços, com o foco do desenvolvimento de uma aplicação para a matéria de programação ECM252 do Instituto Mauá de Tecnologia.

Portanto, o Hammerspace tem como escopo o controle de estoques de cartas de magic de um jogador, bem como seus decks. Como proposta inicial:

- Um jogador pode criar uma conta
- Um jogador pode criar um deck dividindo as cartas em Mainboard, Sideboard e Considerando
- Um jogador pode pesquisar e adicionar cartas a um deck, ao adicionar uma carta o usuário pode informar se possui aquela carta ou não
- Ao adicionar uma carta que o usuário possui a um deck o sistema deve informar que ele possui essa carta em estoque e se ela está sendo usada e por qual deck
- O jogador pode adicionar cartas ao estoque sem estarem vinculadas a um deck
- O jogador deve ser capaz de verificar a lista de compras das cartas faltantes de um deck

## Os microserviços

Atualmente a aplicação possui 2 microsserviços:

- **[api-gateway](https://github.com/Do-Khu/hammerspace-api)**: a porta de entrada da aplicação, todas as iterações externas devem ser feitas à esse microserviço que irá chamar os demais necessários para realizar os comandos requisitados. Atualmente está realizando o controle de: *Usuários*.
- **[cards](https://github.com/Do-Khu/hammerspace-card)**: Microsserviço de consulta de cartas de magic.

## Consumindo a API

### POST api/register

Cadastro do Usuário no sistema.
Exemplo de JSON Body:

``` JSON
{
    "username": "agenteP",
    "password": "72d1b93c50e610a71d7fa0ab6df898e0f90efdf7a3858c3be0f5dc03c0473b9c",
    "fullName": "Perry o Ornitorrinco"
}
```

### POST api/auth

Login do Usuário, permitindo o seu acesso a zonas protegidas da API.
Exemplo de JSON Body:

``` JSON
{
    "username": "agenteP",
    "password": "72d1b93c50e610a71d7fa0ab6df898e0f90efdf7a3858c3be0f5dc03c0473b9c"
}
```

Exemplo do retorno Token JWT HS256:

``` JSON
{
    "token" : "tokenJWT"
}
```

### GET api/refresh

Refresh de Token do Usuário, permitindo o seu acesso a zonas protegidas da API. Deve ser utilizado antes do token expirar em definitivo.

Exemplo do retorno Token JWT HS256:

``` JSON
{
    "token" : "tokenJWT"
}
```

### GET api/users

Listagem de todos os usuários cadastrados na aplicação. (Não Paginada) **REQUER AUTENTICAÇÃO**
Exemplo de retorno:

``` JSON
[
    {
        "_id" : "0",
        "username" : "agenteP",
        "fullName" : "Perry o Ornitorrinco",
        "isActive": true,
        "isDeleted": false
    }
]
```
