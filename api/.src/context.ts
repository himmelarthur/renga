import { PrismaClient } from '@prisma/client'
import express from 'express'
import logger from './logging'
import { AuthenticatedAccount, verifyAuth0 } from './security/account_auth'
import { AuthenticatedUser, verifyIdentity } from './security/party_auth'

const prisma = new PrismaClient()

interface Context {
    prisma: PrismaClient
    user: Promise<AuthenticatedUser | undefined>
    account: Promise<AuthenticatedAccount | undefined>
}

const createContext: (req: express.Request) => Context = (req) => {
    // The request is authenticated or not
    let user: Promise<AuthenticatedUser | undefined> = Promise.resolve(
        undefined
    )
    let account: Promise<AuthenticatedAccount | undefined> = Promise.resolve(
        undefined
    )

    // Party auth
    if (req.headers !== undefined && req.headers.authorization) {
        const token = req.headers.authorization
        logger.debug(
            'Request with bearer token found for ${req.method} ${req.path}'
        )
        user = verifyIdentity(token)
    } else {
        logger.debug('Authorization headers not found')
    }

    // Account auth
    if (req.headers.auth0) {
        const token = req.headers.auth0 as string
        try {
            account = verifyAuth0(token)
        } catch (err) {
            logger.error(`Auth0 headers ca not be verified ${err}`)
        }
    }
    return {
        user,
        prisma,
        account,
    }
}

export { Context, createContext }
