import { objectType } from '@nexus/schema'
import { Context } from '../../context'

export const Account = objectType({
    name: 'Account',
    definition(t) {
        t.model.id()
        t.model.auth0id()
        t.model.createdAt()
        t.model.players()
    },
})

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.username()
        t.model.score()
        t.model.party()
        t.model.hintCount()
        t.int('likedRengaCount', {
            async resolve(parent, args, ctx: Context) {
                return (
                    await ctx.prisma.renga.findMany({
                        where: { authorId: parent.id },
                        select: { likeCount: true },
                    })
                )
                    .map((x) => x.likeCount)
                    .reduce((a, b) => a + b, 0)
            },
        })
        t.int('solvedCount', {
            async resolve(parent, args, ctx: Context) {
                const auth = await ctx.user
                if (!auth) return 0
                return ctx.prisma.submission.count({
                    where: {
                        authorId: parent.id,
                        renga: { partyId: { equals: auth.partyId } },
                        valid: true,
                    },
                })
            },
        })
        t.int('postedCount', {
            async resolve(parent, args, ctx: Context) {
                const auth = await ctx.user
                if (!auth) return 0
                return ctx.prisma.renga.count({
                    where: {
                        authorId: parent.id,
                        partyId: auth.partyId,
                    },
                })
            },
        })
    },
})
