import { intArg, mutationType, stringArg } from '@nexus/schema'
import { HintType } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import { Context } from '../context'
import { appSecret } from '../security/authentication'
import { incrementHintCount, incrementScore } from '../services/User'
import logger from '../logging'

export const Mutation = mutationType({
    definition(t) {
        t.crud.createOneRenga()
        t.crud.updateOneRenga()
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

                const hintCount =
                    (
                        await ctx.prisma.user.findOne({
                            select: { id: true, hintCount: true },
                            where: {
                                id: auth.userId,
                            },
                        })
                    )?.hintCount || 0

                if (hintCount > 0) {
                    await ctx.prisma.hint.create({
                        data: {
                            type: type as HintType,
                            user: { connect: { id: auth.userId } },
                            renga: { connect: { id: rengaId } },
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
