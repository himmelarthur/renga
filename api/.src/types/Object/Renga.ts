import { objectType } from '@nexus/schema'
import { Context } from '../../context'
import { getMovieGenre } from '../../services/Movie'

export const Renga = objectType({
    name: 'Renga',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.deletedAt()
        t.model.author()
        t.model.movie()
        t.model.likeCount()
        t.model.solverCount()
        t.model.attemptCount()
        t.model.successRatio()
        t.model.submissions({
            ordering: { createdAt: true },
            filtering: { authorId: true, valid: true },
        })
        t.model.emojis()
        t.field('status', {
            type: 'Status',
            resolve: async (parent, {}, ctx: Context) => {
                const user = await ctx.user
                if (!user) {
                    return {
                        isMine: false,
                        isResolved: false,
                        isLiked: false,
                        maybeTitle: '',
                    }
                }

                // @ts-ignore
                const isMine = parent.authorId === user.userId
                const isResolved =
                    (await ctx.prisma.submission.count({
                        where: {
                            // @ts-ignore
                            rengaId: parent.id,
                            authorId: user.userId,
                            valid: true,
                        },
                    })) > 0 || false

                const hints = (
                    await ctx.prisma.hint.findMany({
                        select: { type: true },
                        where: {
                            rengaId: parent.id,
                            userId: user?.userId,
                        },
                    })
                ).map((x) => x.type)

                // Maybe title should be stored on renga...
                const movie = await ctx.prisma.movie.findOne({
                    select: { title: true, year: true, genres: true },
                    // @ts-ignore
                    where: { id: parent.movieId },
                })

                const isLiked =
                    (
                        await ctx.prisma.renga.findOne({
                            where: { id: parent.id },
                            select: {
                                likedBy: { where: { id: user?.userId } },
                            },
                        })
                    )?.likedBy
                        .map((x) => x.id)
                        .includes(user.userId) ?? false

                if (!movie) throw Error('No movie associated to this renga')

                // @ts-ignore
                const maybeTitle = isResolved || isMine ? movie.title : ''
                const maybeYear =
                    isResolved || isMine || hints.includes('YEAR')
                        ? movie.year
                        : null
                const maybeGenres =
                    isResolved || isMine || hints.includes('GENRES')
                        ? movie.genres.map((x) => getMovieGenre(x))
                        : null

                return {
                    isMine,
                    isResolved,
                    isLiked,
                    maybeTitle,
                    maybeYear,
                    maybeGenres,
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
        t.boolean('isLiked')
        t.boolean('isResolved')
        t.int('maybeYear', { nullable: true })
        t.string('maybeGenres', { list: true, nullable: true })
    },
})
