import gql from 'graphql-tag'
import JwtDecode from 'jwt-decode'
import { useCallback } from 'react'
import { TokenBody } from '../PartyContext'
import {
    useGetPartyTokenMutation,
    useUpsertAccountMutation,
} from '../generated/graphql'
import { Auth0User, useAuth0 } from '../utils/auth0'
import { useHistory } from 'react-router-dom'
import { track } from '../utils/tracking'

gql`
    mutation upsertAccount($email: String!, $playerIds: [Int!]) {
        upsertAccount(email: $email, userIds: $playerIds) {
            id
        }
    }
`

gql`
    mutation getPartyToken($partyId: String!) {
        getPartyToken(partyId: $partyId)
    }
`

export const getAllTokens: () => TokenBody[] = () => {
    return Object.entries(localStorage)
        .filter((x) => x[0].includes('token:'))
        .flatMap((x) => {
            const [key, token] = x
            const partyId = key.split(':')[1]
            return token && partyId ? JwtDecode(token) : []
        })
}

export const useAccount = () => {
    const history = useHistory()
    const [createAccount] = useUpsertAccountMutation()
    const [getToken] = useGetPartyTokenMutation()
    const {
        user,
        isAuthenticated,
        loading,
        loginWithPopup,
        logout,
    } = useAuth0()

    const login = async (redirectTo?: string) => {
        track('Click Login', { redirectTo })
        const newAuth = await loginWithPopup()
        if (newAuth) track('User LoggedIn')
        if (newAuth) refreshAccount(newAuth)
        if (redirectTo && newAuth) history.push(redirectTo)
    }

    const refreshAccount = useCallback(
        async (authUser: Auth0User) => {
            const allTokens = getAllTokens()
            const playerIds: number[] = allTokens.map((x) => x.userId)
            return createAccount({
                variables: {
                    email: authUser.email,
                    playerIds,
                },
            })
        },
        [createAccount]
    )

    const getTokenFromAccount: (
        partyId: string
    ) => Promise<string | undefined> = useCallback(
        async (partyId) => {
            if (!user) return undefined
            const res = await getToken({
                variables: { partyId },
            })
            if (res.errors) return undefined
            if (!res.data?.getPartyToken) return undefined
            return res.data.getPartyToken
        },
        [getToken, user]
    )

    return {
        getTokenFromAccount,
        user,
        isAuthenticated,
        loading,
        login,
        logout,
    }
}
