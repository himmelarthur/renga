import { objectType } from '@nexus/schema'
import { Context } from '../context'

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.username()
        t.model.score()
    },
})

export const Party = objectType({
    name: 'Party',
    definition(t) {
        t.model.id()
        t.model.users({ ordering: { score: true } })
    },
})

export const Submission = objectType({
    name: 'Submission',
    definition(t) {
        t.model.id()
        t.model.valid()
        t.model.author()
        t.model.createdAt()
        t.string('maybeTitle', {
            async resolve(parent, args, ctx: Context) {
                const user = await ctx.user
                if (!user) return ''
                const hasValidSubmission = await ctx.prisma.submission.count({
                    where: {
                        authorId: user?.userId,
                        // @ts-ignore
                        rengaId: parent.rengaId,
                        valid: true,
                    },
                }) > 0

                // @ts-ignore
                return (hasValidSubmission || !parent.valid) ? parent.movieTitle : ''
            },
        })
    },
})

export const Renga = objectType({
    name: 'Renga',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.author()
        t.model.movie()
        t.model.submissions({
            ordering: { createdAt: true },
            filtering: { authorId: true, valid: true },
        })
        t.model.emojis()
        t.boolean('isMine', {
            async resolve(parent, _, ctx: Context) {
                const user = await ctx.user
                if (user === undefined) return false
                // @ts-ignore
                return parent.authorId === user.userId
            },
        })
        t.boolean('isResolved', {
            async resolve(parent, _, ctx: Context) {
                const user = await ctx.user
                if (user === undefined) return false
                const hasValidSubmission = await ctx.prisma.submission.count({
                    where: {
                        authorId: user?.userId,
                        rengaId: parent.id,
                        valid: true,
                    },
                }) > 0
                return hasValidSubmission
            },
        })
    },
})

export const Movie = objectType({
    name: 'Movie',
    definition(t) {
        t.model.movieDBId()
        t.string('maybeTitle', {
            async resolve(parent, _, ctx: Context) {
                const user = await ctx.user
                if (user === undefined) return ''
                const hasValidSubmission = await ctx.prisma.submission.count({
                    where: {
                        authorId: user?.userId,
                        movieDBId: parent.movieDBId,
                        valid: true,
                    },
                }) > 0
                // @ts-ignore
                return hasValidSubmission ? parent.title : ''
            },
        })
    },
})
