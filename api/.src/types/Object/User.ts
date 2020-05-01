import { objectType } from '@nexus/schema'
import { Context } from '../../context'

export const Account = objectType({
    name: 'Account',
    definition(t) {
        t.model.id()
        t.model.auth0id()
        t.model.createdAt()
        t.model.players()
        t.field('stats', {
            type: 'AccountStats',
            nullable: true,
            async resolve(parent, {}, ctx: Context) {
                const account = await ctx.account
                if (!account) return null
                const res = await ctx.prisma.raw<
                    {
                        rengacount: number
                        distinctmoviecount: number
                    }[]
                >`
                    SELECT 
                        COUNT(r."id") as rengacount, 
                        COUNT(DISTINCT(r."movieId")) as distinctmoviecount
                    FROM "Renga" r
                    JOIN "User" u ON r."authorId" = u."id" 
                    JOIN "Account" a ON a."id" = u."accountId" 
                    WHERE a."auth0id" = ${account.auth0Id} AND r."solverCount" > 0;`
                if (res.length != 1) return null
                return {
                    distinctMovieCount: res[0].distinctmoviecount,
                    rengaCount: res[0].rengacount,
                }
            },
        })
    },
})

export const AccountStats = objectType({
    name: 'AccountStats',
    definition(t) {
        t.int('distinctMovieCount')
        t.int('rengaCount')
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
                return ctx.prisma.submission.count({
                    where: {
                        authorId: parent.id,
                        valid: true,
                    },
                })
            },
        })
        t.int('postedCount', {
            async resolve(parent, args, ctx: Context) {
                return ctx.prisma.renga.count({
                    where: {
                        authorId: parent.id,
                    },
                })
            },
        })
    },
})
