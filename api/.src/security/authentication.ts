import { verify } from 'jsonwebtoken'
import { Context } from '../context'

// TODO

export interface AuthenticatedPlayer {
    playerId: string
    partyId: string
}

export const verifyIdentity = async (token?: string) => {
    return { playerId: 'foo', partyId: 'bar' }
}

export const appSecret = () => {
    const secret = process.env.APP_SECRET
    if (!secret) throw new Error('Please define the `APP_SECRET` envvar')
    return secret
}
