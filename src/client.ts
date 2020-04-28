import { InMemoryCache } from 'apollo-boost'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'

export const DEFAULT_RENGAS_PAGE_COUNT = 3

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL,
})
const authLink = setContext((_, { headers }) => {
    const currentPartyId = sessionStorage.getItem('currentPartyId')
    const token = localStorage.getItem(`token:${currentPartyId}`)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({}),
})
