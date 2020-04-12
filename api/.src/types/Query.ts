import { queryType, stringArg } from '@nexus/schema'
import { Context } from '../context'
import { sign } from 'jsonwebtoken'
import { appSecret } from '../security/authentication'

export const Query = queryType({
    definition(t) {
        t.crud.users()
        t.crud.renga()
        t.crud.rengas({ filtering: true, ordering: true })
        t.crud.party()
        t.field('invitePartyLink', {
            type: 'String',
            args: {
                partyId: stringArg({ required: true }),
            },
            resolve: async (_, { partyId }, ctx: Context) => {
                const user = await ctx.user
                if (user?.partyId !== partyId) throw new Error("Authenticated user can only invite for current party")
                    return `join?token=${sign(
                        {
                            partyId,
                        },
                        appSecret()
                    )}`
            },
        })
    },
})
