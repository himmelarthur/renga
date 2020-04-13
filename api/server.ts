import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import { createContext } from './.src/context'
import { schema } from './.src/schema'
import * as Sentry from '@sentry/node'
import dotenv from 'dotenv'
import logger from './.src/logging'
import { permissions } from './.src/security/permissions'
dotenv.config()

Sentry.init({
    dsn: 'https://dbbff303002a4521a2de4c7bffac69bb@sentry.io/1841359',
})

const schemaMiddleware = applyMiddleware(schema, permissions)

const server = new ApolloServer({
    schema: schemaMiddleware,
    context: ({ req }) => createContext(req),
    engine: {
        apiKey: process.env.ENGINE_API_KEY,
    },
})

server.listen({ port: process.env.PORT || 4000, graphqlPath: '/api' }, () =>
    logger.info(`🚀 Server ready at http://localhost:4000/api`)
)
