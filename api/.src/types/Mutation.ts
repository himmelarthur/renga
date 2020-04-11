import { mutationType, stringArg } from '@nexus/schema'
import { sign } from 'jsonwebtoken'
import { appSecret } from '../security/authentication'
import { Context } from '../context'

export const Mutation = mutationType({
    definition(t) {
        t.crud.createOneUser()
        t.field('createParty', {
            type: 'String',
            args: {
                username: stringArg({ required: true }),
            },
            resolve: async (_, { username }, context: Context) => {
                const party = await context.prisma.party.create({
                    data: {
                        id: Math.random().toString(36).substr(2, 9),
                        users: {
                            create: {
                                username,
                            },
                        },
                    },
                })
                return sign({ username, party }, appSecret())
            },
        })
    },
})
