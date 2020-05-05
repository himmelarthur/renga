import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import logger from '../logging'

interface DecodedAccessToken {
    sub: string
    permissions: string[]
}

export interface AuthenticatedAccount {
    auth0Id: string
}

const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
})

const options = {
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
}

function getKey(header: any, cb: any) {
    client.getSigningKey(header.kid, (err: any, key: any) => {
        let signingKey
        try {
            signingKey = key.publicKey || key.rsaPublicKey
        } catch {
            logger.error(
                `Something went wrong when getting signingKey err: ${err} header: ${header} key:${key}`
            )
        } finally {
            cb(null, signingKey)
        }
    })
}

export const verifyAuth0: (
    token: string
) => Promise<AuthenticatedAccount> = async (token: string) => {
    const authToken = token.replace('Bearer ', '')
    return new Promise((resolve, reject) => {
        jwt.verify(
            authToken,
            getKey,
            options,
            (err, decoded: string | object) => {
                if (err || typeof decoded === 'string') {
                    logger.error(err)
                    return reject(
                        `Authorization headers not well decoded ${err}`
                    )
                }
                const token = decoded as DecodedAccessToken
                resolve({
                    auth0Id: token.sub,
                })
            }
        )
    })
}
