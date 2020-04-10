import { InMemoryCache } from 'apollo-boost'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL,
})
const authLink = setContext((_, { headers }) => {
    // TODO
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({}),
})
