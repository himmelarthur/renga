import { PrismaClient } from '@prisma/client'
import { verifyIdentity, AuthenticatedUser } from './security/authentication'
import express from 'express'
import logger from './logging'
import { IncomingHttpHeaders } from 'http'

const prisma = new PrismaClient()

interface Context {
    prisma: PrismaClient
    user: Promise<AuthenticatedUser | undefined>
    headers: IncomingHttpHeaders
}

const createContext: (req: express.Request) => Context = (req) => {
    // The request is authenticated or not
    let user: Promise<AuthenticatedUser | undefined>
    const token =
        req.headers !== undefined ? req.headers.authorization : undefined
    if (token) {
        logger.debug(
            `Request with bearer token found for ${req.method} ${req.path}`
        )
        user = verifyIdentity(token)
    } else {
        logger.debug('Authorization headers not found')
        user = Promise.resolve(undefined)
    }
    user = user.catch((err) => {
        // If any already caught error return undefined
        logger.error(err)
        return undefined
    })

    return {
        user,
        prisma,
        headers: req.headers,
    }
}

export { Context, createContext }
