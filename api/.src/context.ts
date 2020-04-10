import { PrismaClient } from '@prisma/client'
import { verifyIdentity, AuthenticatedPlayer } from './security/authentication'
import express from 'express'
import logger from './logging'

const prisma = new PrismaClient()

interface Context {
    prisma: PrismaClient
    user: Promise<AuthenticatedPlayer | undefined>
}

const createContext: (req: express.Request) => Context = req => {
    // The request is authenticated or not
    let player: Promise<AuthenticatedPlayer | undefined>
    if (req.headers !== undefined && req.headers.authorization) {
        const token = req.headers.authorization
        logger.debug(
            `Request with bearer token found for ${req.method} ${req.path}`
        )
        player = verifyIdentity(token)
    } else {
        logger.debug('Authorization headers not found')
        player = Promise.resolve(undefined)
    }
    player = player.catch(err => {
        // If any already caught error return undefined
        logger.error(err)
        return undefined
    })

    return {
        user: player,
        prisma,
    }
}

export { Context, createContext }