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
    dsn:
        'https://f80e05cbcee64135a0c28df600eabe64@o378128.ingest.sentry.io/5201075',
})

const schemaMiddleware = applyMiddleware(schema, permissions)

const server = new ApolloServer({
    schema: schemaMiddleware,
    context: ({ req }) => createContext(req),
    engine: {
        apiKey: process.env.ENGINE_API_KEY,
        schemaTag: process.env.ENGINE_VARIANT
    },
})

server.listen({ port: process.env.PORT || 4000, graphqlPath: '/api' }, () =>
    logger.info(`🚀 Server ready at http://localhost:4000/api`)
)
