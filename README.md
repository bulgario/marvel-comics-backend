# marvel-comics-backend
Using the [Marvel API](https://developer.marvel.com).


# Url backend
https://marvel-comics-lib.herokuapp.com/

## Start

Clone esse repositório então instale suas dependencias usando:

```bash
$ npm install
```

Crie um arquivo `.env` que deve conter suas credenciais da Marvel API, sua token secreta e os dados do banco:

```
MARVEL_PUBLIC_KEY=your_public_key
MARVEL_PRIVATE_KEY=your_private_key

DATABASE_URL='your_url'
DATABASE_NAME='your_data_base_name'
DATABASE_USER='your_data_base_user'
DATABASE_PASSWORD='your_password'

ACCESS_TOKEN_SECRET='your_token_secret'
```

Inicie o servidor com npm start

```bash
$ npm run devStart
```

## Comentários

### O uso do tcomb 
Tcomb é uma biblioteca para Node.js e que permite verificar os tipos de valores JavaScript.
É ótimo para Domain Driven Design e para adicionar segurança ao seu código interno.


### O não uso de uma ORM

Por questões de tempo não optei o uso de uma ORM por ganho de tempo.


### Modelos para descrever dados

Linguagens dinâmicas como JavaScript não têm tipos, o que pode tornar difícil descobrir que tipo de estruturas de dados o projeto está usando.
Aqui, foi declarado "modelos" (no sentido de "modelo de domínio", não "modelos de banco de dados"),
que servem como documentação e também podem ser usados ​​programaticamente para validar respostas JSON.


### ACCESS_TOKEN_SECRET
Esta token foi gerada pelo terminal do NODE usando bcrypt
