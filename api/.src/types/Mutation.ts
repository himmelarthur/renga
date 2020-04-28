import { HintType } from '@prisma/client'
import { incrementHintCount, incrementScore } from '../services/User'
import { intArg, mutationType, stringArg, booleanArg } from '@nexus/schema'
import { sign } from 'jsonwebtoken'
import { Context } from '../context'
import { appSecret } from '../security/authentication'
import { populateRengas } from '../services/Renga'

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
                const isValid = renga.movie.movieDBId === movieDBId

                const auth = await context.user
                if (!auth?.userId) throw Error('User should be authenticated')

                if (isValid) {
                    // FIXME should be transaction when available
                    // https://github.com/prisma/prisma-client-js/issues/349

                    await incrementScore(context.prisma, {
                        userId: auth.userId,
                        rengaId,
                    })

                    await incrementHintCount(context.prisma, {
                        userId: renga.authorId,
                        rengaId,
                    })
                }

                return await context.prisma.submission.create({
                    data: {
                        author: { connect: { id: auth.userId } },
                        renga: { connect: { id: rengaId } },
                        movieDBId,
                        movieTitle,
                        valid: isValid,
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
                const user = await context.prisma.user.create({
                    data: {
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
                    minAttemptsCount: 0,
                    minSuccessRatio: 0,
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
                const user = await ctx.prisma.user.create({
                    data: {
                        username,
                        party: { connect: { id: partyId } },
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
    },
})
