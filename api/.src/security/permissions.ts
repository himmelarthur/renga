import { allow, and, rule, shield } from 'graphql-shield'
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
        args: { where: { partyId: { equals: string } } },
        ctx: Context,
        info
    ) => {
        return args.where.partyId.equals !== undefined
    }
)

export const permissions = shield(
    {
        Mutation: {
            createSubmission: and(isAuthenticated, canSolveRenga),
            createOneRenga: and(isAuthenticated, isParticipant),
        },
        Query: {
            rengas: shouldBePartyOnly,
            user: isAuthenticated,
        },
    },
    { fallbackRule: allow }
)
