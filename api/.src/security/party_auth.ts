import { verify } from 'jsonwebtoken'

export interface AuthenticatedUser {
    userId: number
    partyId: string
}

export const verifyIdentity = async (token: string) => {
    return verify(
        token.replace('Bearer ', ''),
        appSecret()
    ) as AuthenticatedUser
}

export const appSecret = () => {
    const secret = process.env.APP_SECRET
    if (!secret) throw new Error('Please define the `APP_SECRET` envvar')
    return secret
}
