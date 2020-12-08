# marvel-comics-backend
Using the [Marvel API](https://developer.marvel.com).

## Start

Clone esse repositório então instale suas dependencias usando:

```bash
$ npm install
```

Crie um arquivo `.env` que deve conter suas credenciais da Marvel API:

```
export MARVEL_PUBLIC_KEY=your_public_key
export MARVEL_PRIVATE_KEY=your_private_key
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


### Modelos para descrever dados\

Linguagens dinâmicas como JavaScript não têm tipos, o que pode tornar difícil descobrir que tipo de estruturas de dados o projeto está usando.
Aqui, foi declarado "modelos" (no sentido de "modelo de domínio", não "modelos de banco de dados"),
que servem como documentação e também podem ser usados ​​programaticamente para validar respostas JSON.
