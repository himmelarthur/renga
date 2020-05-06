import { allow, and, rule, shield, or } from 'graphql-shield'
import util from 'util'
import { Context } from '../context'
import logger from '../logging'

const isAuthenticated = rule({ cache: 'contextual' })(
    async (_, args, ctx: Context, info) => {
        const userAuth = await ctx.user
        logger.debug(`Authenticated user:${util.inspect(userAuth)}`)
        return userAuth !== null && userAuth !== undefined
    }
)

const hasAccount = rule({ cache: 'contextual' })(
    async (_, args, ctx: Context, info) => {
        const account = await ctx.account
        logger.debug(`Authenticated user:${util.inspect(account)}`)
        return account !== null && account !== undefined
    }
)

const canSolveRenga = rule({ cache: 'contextual' })(
    async (_, args: { rengaId: number }, ctx: Context, info) => {
        const user = await ctx.user
        logger.debug(`Authenticated user:${util.inspect(user)}`)
        const partyId = (
            await ctx.prisma.renga.findOne({
                select: { partyId: true },
                where: { id: args.rengaId },
            })
        )?.partyId
        return user?.partyId === partyId
    }
)

const ownRenga = rule({ cache: 'contextual' })(
    async (_, args: { where: { id: number } }, ctx: Context, info) => {
        const rengaId = args.where.id
        const user = await ctx.user
        return (
            (await ctx.prisma.renga.count({
                where: { id: rengaId, authorId: user?.userId },
            })) > 0
        )
    }
)
const isParticipant = rule({ cache: 'contextual' })(
    async (
        _,
        args: { data: { party: { connect: { id: string } } } },
        ctx: Context,
        info
    ) => {
        const user = await ctx.user
        return user?.partyId === args.data.party.connect.id
    }
)

const shouldBePartyOnly = rule({ cache: 'contextual' })(
    async (
        _,
        args: {
            where?: {
                partyId: { equals: string }
            }
        },
        ctx: Context,
        info
    ) => {
        return args.where?.partyId.equals !== undefined || false
    }
)

const shouldBeAccountOnly = rule({ cache: 'contextual' })(
    async (
        _,
        args: {
            where: {
                author: { account: { auth0id: { equals: string } } }
            }
        },
        ctx: Context,
        info
    ) => {
        return args.where?.author.account.auth0id !== undefined || false
    }
)

export const permissions = shield(
    {
        Mutation: {
            likeRenga: and(isAuthenticated, canSolveRenga),
            createSubmission: and(isAuthenticated, canSolveRenga),
            createOneRenga: and(isAuthenticated, isParticipant),
            updateOneRenga: and(isAuthenticated, ownRenga),
        },
        Query: {
            rengas: or(and(shouldBeAccountOnly, hasAccount), shouldBePartyOnly),
            user: isAuthenticated,
        },
    },
    { fallbackRule: allow }
)
