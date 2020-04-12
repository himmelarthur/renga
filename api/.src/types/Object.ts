import { objectType } from '@nexus/schema'
import { Context } from '../context'

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.username()
    },
})

export const Party = objectType({
    name: 'Party',
    definition(t) {
        t.model.id()
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
                if (user === undefined) return ''
                const validSubmissions = await ctx.prisma.submission.findMany({
                    where: {
                        authorId: user?.userId,
                        // @ts-ignore
                        rengaId: parent.rengaId,
                        valid: true,
                    },
                })
                // @ts-ignore
                return !!validSubmissions.length ? parent.movieTitle : ''
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
        t.boolean('isResolved', {
            async resolve(parent, args, ctx: Context) {
                const user = await ctx.user
                if (user === undefined) return false
                const validSubmissions = await ctx.prisma.submission.findMany({
                    where: {
                        authorId: user?.userId,
                        rengaId: parent.id,
                        valid: true,
                    },
                })
                // @ts-ignore
                return !!validSubmissions.length
            },
        })
    },
})

export const Movie = objectType({
    name: 'Movie',
    definition(t) {
        t.model.movieDBId()
        t.string('maybeTitle', {
            async resolve(parent, args, ctx: Context) {
                const user = await ctx.user
                if (user === undefined) return ''
                const validSubmissions = await ctx.prisma.submission.findMany({
                    where: {
                        authorId: user?.userId,
                        movieDBId: parent.movieDBId,
                        valid: true,
                    },
                })
                // @ts-ignore
                return !!validSubmissions.length ? parent.title : ''
            },
        })
    },
})
