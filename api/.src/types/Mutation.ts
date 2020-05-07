import { intArg, mutationType, stringArg } from '@nexus/schema'
import { HintType } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import { Context } from '../context'
import { incrementRenga, populateRengas } from '../Renga/service'
import { appSecret } from '../security/party_auth'
import { incrementHintCount, incrementScore } from '../services/User'

export const Mutation = mutationType({
    definition(t) {
        t.crud.createOneRenga()
        t.crud.updateOneRenga()
        t.field('likeRenga', {
            type: 'Renga',
            args: {
                rengaId: intArg({ required: true }),
            },
            resolve: async (_, { rengaId }, ctx: Context) => {
                const auth = await ctx.user
                if (!auth?.userId) throw Error('User should be authenticated')

                await ctx.prisma.renga.update({
                    where: { id: rengaId },
                    data: { likedBy: { connect: { id: auth.userId } } },
                })
                const renga = await ctx.prisma.renga.findOne({
                    where: { id: rengaId },
                    select: { likedBy: { select: { id: true } } },
                })
                return ctx.prisma.renga.update({
                    where: { id: rengaId },
                    data: {
                        likeCount: renga?.likedBy.length,
                    },
                })
            },
        })
        t.field('createSubmission', {
            type: 'Submission',
            args: {
                rengaId: intArg({ required: true }),
                movieDBId: intArg({ required: true }),
                movieTitle: stringArg({ required: true }),
            },
            resolve: async (
                _,
                { rengaId, movieDBId, movieTitle },
                context: Context
            ) => {
                const renga = await context.prisma.renga.findOne({
                    select: { authorId: true, movie: true },
                    where: { id: rengaId },
                })
                if (!renga) throw Error('Renga not found')
                const isSolved = renga.movie.movieDBId === movieDBId

                const auth = await context.user
                if (!auth?.userId) throw Error('User should be authenticated')

                const previousSubmissions = await context.prisma.submission.findMany(
                    {
                        select: { valid: true },
                        where: { rengaId },
                    }
                )

                const isFirstSolved = !previousSubmissions.some((x) => x.valid)

                if (isSolved) {
                    // FIXME should be transaction when available
                    // https://github.com/prisma/prisma-client-js/issues/349

                    await incrementScore(context.prisma, {
                        userId: auth.userId,
                        isFirstSolved,
                    })

                    await incrementHintCount(context.prisma, {
                        userId: renga.authorId,
                        isFirstSolved,
                    })
                }

                await incrementRenga(context.prisma, {
                    rengaId,
                    previousSubmissions,
                    isSolved,
                })

                return await context.prisma.submission.create({
                    data: {
                        author: { connect: { id: auth.userId } },
                        renga: { connect: { id: rengaId } },
                        movieDBId,
                        movieTitle,
                        valid: isSolved,
                    },
                })
            },
        })
        t.field('createParty', {
            type: 'String',
            args: {
                username: stringArg({ required: true }),
            },
            resolve: async (_, { username }, context: Context) => {
                const auth0id = (await context.account)?.auth0Id
                const user = await context.prisma.user.create({
                    data: {
                        account: auth0id
                            ? {
                                  connect: {
                                      auth0id,
                                  },
                              }
                            : undefined,
                        party: {
                            create: {
                                id: Math.random().toString(36).substr(2, 9),
                            },
                        },
                        username,
                    },
                })

                await populateRengas(context.prisma, {
                    partyId: user.partyId,
                    count: 5,
                    minAttemptsCount: 10,
                    minSuccessRatio: 0.7,
                })

                return sign(
                    {
                        userId: user.id,
                        username: user.username,
                        partyId: user.partyId,
                    },
                    appSecret()
                )
            },
        })
        t.field('useHint', {
            type: 'Boolean',
            args: {
                rengaId: intArg({ required: true }),
                type: stringArg({ required: true }),
            },
            resolve: async (_, { rengaId, type }, ctx: Context) => {
                const auth = await ctx.user
                if (!auth) throw new Error('No user')

                const user = await ctx.prisma.user.findOne({
                    select: { id: true, hintCount: true },
                    where: {
                        id: auth.userId,
                    },
                })

                if (!user) throw new Error('No user')

                if (user.hintCount > 0) {
                    await ctx.prisma.hint.create({
                        data: {
                            type: type as HintType,
                            user: { connect: { id: auth.userId } },
                            renga: { connect: { id: rengaId } },
                        },
                    })

                    await ctx.prisma.user.update({
                        where: {
                            id: auth.userId,
                        },
                        data: {
                            hintCount: user.hintCount - 1,
                        },
                    })

                    return true
                } else {
                    return false
                }
            },
        })
        t.field('joinParty', {
            type: 'String',
            args: {
                partyId: stringArg({ required: true }),
                username: stringArg({ required: true }),
            },
            resolve: async (_, { partyId, username }, ctx: Context) => {
                const auth0id = (await ctx.account)?.auth0Id
                const user = await ctx.prisma.user.create({
                    data: {
                        username,
                        party: { connect: { id: partyId } },
                        account: auth0id
                            ? {
                                  connect: { auth0id },
                              }
                            : undefined,
                    },
                })
                return sign(
                    {
                        userId: user.id,
                        username: user.username,
                        partyId: user.partyId,
                    },
                    appSecret()
                )
            },
        })
        t.field('upsertAccount', {
            type: 'Account',
            args: {
                email: stringArg(),
                userIds: intArg({ list: true }),
            },
            resolve: async (_, { email, userIds }, ctx: Context) => {
                const auth0id = (await ctx.account)?.auth0Id
                if (!auth0id) throw Error('Account not authenticated')
                const players = await ctx.prisma.user.findMany({
                    select: { id: true },
                    where: { accountId: null, id: { in: userIds } },
                })
                return ctx.prisma.account.upsert({
                    where: { auth0id },
                    update: {
                        email,
                        players: {
                            connect: players.map((x) => {
                                return {
                                    id: x.id,
                                }
                            }),
                        },
                    },
                    create: {
                        auth0id,
                        email,
                        players: {
                            connect: players.map((x) => {
                                return {
                                    id: x.id,
                                }
                            }),
                        },
                    },
                })
            },
        })
        t.field('getPartyToken', {
            type: 'String',
            nullable: true,
            args: {
                partyId: stringArg({ required: true }),
            },
            resolve: async (_, { partyId }, ctx: Context) => {
                const auth0id = (await ctx.account)?.auth0Id
                if (!auth0id) throw Error('Account not authenticated')
                const users = await ctx.prisma.user.findMany({
                    orderBy: { createdAt: 'desc' },
                    where: {
                        account: { auth0id: { equals: auth0id } },
                        partyId,
                    },
                })
                if (users.length === 0) return null
                const user = users[0]
                return sign(
                    {
                        userId: user.id,
                        username: user.username,
                        partyId: user.partyId,
                    },
                    appSecret()
                )
            },
        })
    },
})
