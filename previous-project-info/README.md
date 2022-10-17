# hammerspace-api - stable v1

## Sobre o projeto

Este é um projeto de estudos de desenvolvimento de aplicações com a utilização de microserviços, com o foco de propor um produto que pode ser utilizado em situações de guerra assim como é especificado no escopo da matéria de programação ECM252 do Instituto Mauá de Tecnologia.

Portanto, o Hammerspace tem como escopo o controle de estoques de suprimentos e materiais em abrigos sem revelar suas posições exatas, apresentando uma interface de interação e funcionamento gameficada. Como proposta inicial:

- Um abrigo pode enviar suprimentos a outros abrigos
- Um abrigo pode requisitar ajuda para envio de suprimentos
- Um abrigo pode adquirir suprimentos externamente (comprando por via externa)
- O aplicativo não faz gerenciamento de gastos financeiros do abrigo
- O aplicativo faz uma estimativa de quanto tempo os suprimentos disponiveis devem durar e emite alertas para previos para seu reabastecimento

## Os microserviços

Atualmente a aplicação possui 1 microserviço:

- **api-gateway**: a porta de entrada da aplicação, todas as iterações externas devem ser feitas à esse microserviço que irá chamar os demais necessários para realizar os comandos requisitados. Atualmente está realizando o controle de: *Usuários*.

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
