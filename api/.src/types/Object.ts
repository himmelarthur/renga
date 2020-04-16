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
                const hasValidSubmission =
                    (await ctx.prisma.submission.count({
                        where: {
                            authorId: user?.userId,
                            // @ts-ignore
                            rengaId: parent.rengaId,
                            valid: true,
                        },
                    })) > 0
                // @ts-ignore
                const maybeTitle = parent.movieTitle
                return hasValidSubmission || !parent.valid ? maybeTitle : ''
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
        t.field('status', {
            type: 'Status',
            resolve: async (parent, {}, ctx: Context) => {
                const user = await ctx.user
                // @ts-ignore
                const isMine = parent.authorId === user?.userId
                const isResolved =
                    (await ctx.prisma.submission.count({
                        where: {
                            authorId: user?.userId,
                            // @ts-ignore
                            rengaId: parent.id,
                            valid: true,
                        },
                    })) > 0 && !!user?.userId

                const movie = (
                    await ctx.prisma.movie.findOne({
                        select: { title: true },
                        // @ts-ignore
                        where: { id: parent.movieId },
                    })
                )

                if (!movie) throw Error('No movie associated to this renga')
                
                // @ts-ignore
                const maybeTitle = isResolved || isMine ? movie.title : ''

                return {
                    isMine,
                    isResolved,
                    maybeTitle,
                }
            },
        })
    },
})

export const status = objectType({
    name: 'Status',
    definition(t) {
        t.string('maybeTitle')
        t.boolean('isMine')
        t.boolean('isResolved')
    },
})

export const Movie = objectType({
    name: 'Movie',
    definition(t) {
        t.model.id()
        t.model.movieDBId()
    },
})
