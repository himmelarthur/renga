import { InMemoryCache } from 'apollo-boost'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { Auth0 } from './utils/auth0'

export const DEFAULT_RENGAS_PAGE_COUNT =
    Number(process.env.REACT_APP_DEFAULT_RENGAS_PAGE_COUNT) || 3

const getAuth0Token = async () => {
    try {
        return await Auth0.getTokenSilently()
    } catch (err) {
        return undefined
    }
}

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL,
})
const authLink = setContext(async (_, { headers }) => {
    const currentPartyId = sessionStorage.getItem('currentPartyId')
    const token = localStorage.getItem(`token:${currentPartyId}`)
    const auth0 = await getAuth0Token()
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
            auth0: auth0 ? `Bearer ${auth0}` : '',
        },
    }
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({}),
})
