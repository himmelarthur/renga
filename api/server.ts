import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import { createContext } from './.src/context'
import { schema } from './.src/schema'
import dotenv from 'dotenv'
import logger from './.src/logging'
import { permissions } from './.src/security/permissions'

dotenv.config()

const schemaMiddleware = applyMiddleware(schema, permissions)

const server = new ApolloServer({
    schema: schemaMiddleware,
    context: ({ req }) => createContext(req),
})

server.listen({ port: process.env.PORT || 4000, graphqlPath: '/api' }, () =>
    logger.info(`🚀 Server ready at http://localhost:4000/api`)
)
