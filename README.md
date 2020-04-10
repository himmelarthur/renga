
# API 

## Apollo server

`/api` contains renga Apollo Server. It requires 

- `ENGINE_API_KEY=XXX` that sould be provided as environment variable

It allows to publish the schema graphl by using 

```
cd api
npx apollo service:push --endpoint=http://localhost:4000/api --tag YOUR-TAG
```

Then using Apollo GraphQL VSC extension you'll be able to write you queries in a very safe way.

## Seed 

`npm run seed` seed the database with fixtures

## Logging

Should use `import logging from './logging`


# CRA

## Local dev environment variable 

Should be provided `REACT_APP_API_URL`, `APOLLO_KEY`

## Code generation

`npm run generate` run codegen against `http://localhost:4000/api` and parse all `*.tsx` files to generate hooks of your queries.