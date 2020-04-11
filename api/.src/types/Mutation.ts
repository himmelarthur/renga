import { mutationType, intArg, stringArg } from '@nexus/schema'
import { sign } from 'jsonwebtoken'
import { appSecret } from '../security/authentication'
import { Context } from '../context'

export const Mutation = mutationType({
    definition(t) {
        t.crud.createOneUser()
        t.crud.createOneRenga()
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
                const res = await context.prisma.renga.findMany({
                    where: { AND: [{ id: rengaId }, { movie: { movieDBId } }] },
                })
                const user = await context.user
                if (user?.userId === undefined) {
                    throw Error('User should be authenticated')
                }
                return await context.prisma.submission.create({
                    data: {
                        author: { connect: { id: user.userId } },
                        renga: { connect: { id: rengaId } },
                        movieDBId,
                        movieTitle,
                        valid: !!res.length,
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
                    select: { partyId: true, id: true },
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
                    { userId: user.id, partyId: user.partyId },
                    appSecret()
                )
            },
        })
    },
})
