import gql from 'graphql-tag'
import {
    useGetPartyTokenMutation,
    useUpsertAccountMutation,
} from '../generated/graphql'
import { Auth0User, useAuth0 } from '../utils/auth0'
import { TokenBody } from '../Party/hooks'
import JwtDecode from 'jwt-decode'
import { useEffect } from 'react'

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
    const [createAccount] = useUpsertAccountMutation()
    const [getToken] = useGetPartyTokenMutation()
    const { user, isAuthenticated, loading } = useAuth0()

    useEffect(() => {
        if (user) refreshAccount(user)
    }, [user])

    const refreshAccount = async (authUser: Auth0User) => {
        const allTokens = getAllTokens()
        const playerIds: number[] = allTokens.map((x) => x.userId)
        return createAccount({
            variables: {
                email: authUser.email,
                playerIds,
            },
        })
    }

    const getTokenFromAccount: (
        partyId: string
    ) => Promise<string | undefined> = async (partyId) => {
        if (!user) return undefined
        const res = await getToken({
            variables: { partyId },
        })
        if (res.errors) return undefined
        if (!res.data?.getPartyToken) return undefined
        return res.data.getPartyToken
    }

    return {
        getTokenFromAccount,
        refreshAccount,
        user,
        isAuthenticated,
        loading,
    }
}
