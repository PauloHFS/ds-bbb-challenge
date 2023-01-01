# ds-bbb-challenge

Desafio: <https://dev.to/zanfranceschi/desafio-sistema-de-votacao-bbb-50e3>

## Como rodar

1. Execute o RabbiMQ

```bash
docker run -p 8080:15672 -p 5672:5672 rabbitmq:3-management
```

2. Execute a API de votação

```bash
cd sender
npm install
npm dev
```

3. Execute o worker que irá processar as mensagens

```bash
cd consumer
npm install
npm dev
```

## Como votar

```bash
$ curl --request POST \
    --url http://localhost:3000/votacao \
    --header 'Content-Type: application/json' \
    --data '{
        "candidato": 1
    }'
```

*candidato é pode ser um número de 1 a 4*
