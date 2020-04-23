import { objectType } from '@nexus/schema'
import { HintType } from '@prisma/client'
import { Context } from '../context'
import { getMovieGenre } from '../services/Movie'

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.username()
        t.model.score()
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
            nullable: true,
            async resolve(parent, args, ctx: Context) {
                const user = await ctx.user
                if (!user) throw new Error('User shoud be auth')

                const usedHintTimeline =
                    (await ctx.prisma.hint.count({
                        where: {
                            userId: user.userId,
                            // @ts-ignore
                            rengaId: parent.rengaId,
                            type: HintType.TIMELINE,
                        },
                    })) > 0

                const isResolved =
                    (await ctx.prisma.submission.count({
                        where: {
                            authorId: user?.userId,
                            // @ts-ignore
                            rengaId: parent.rengaId,
                            valid: true,
                        },
                    })) > 0

                const isMyRenga =
                    (await ctx.prisma.renga.count({
                        where: {
                            authorId: user?.userId,
                            // @ts-ignore
                            id: parent.rengaId,
                        },
                    })) > 0

                // @ts-ignore
                const maybeTitle = parent.movieTitle
                // @ts-ignore
                const isMySubmission = parent.authorId === user.userId
                return isResolved ||
                    isMyRenga ||
                    (!parent.valid && usedHintTimeline) ||
                    isMySubmission
                    ? maybeTitle
                    : null
            },
        })
    },
})

export const Renga = objectType({
    name: 'Renga',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.deletedAt()
        t.model.author()
        t.model.movie()
        t.model.likeCount()
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
                const solvers = (
                    await ctx.prisma.submission.findMany({
                        select: { authorId: true },
                        where: {
                            // @ts-ignore
                            rengaId: parent.id,
                            valid: true,
                        },
                    })
                ).map((x) => x.authorId)

                const isResolved = user?.userId
                    ? solvers.includes(user.userId)
                    : false
                const solversCount = solvers.length

                const hints = (
                    await ctx.prisma.hint.findMany({
                        select: { type: true },
                        where: {
                            rengaId: parent.id,
                            userId: user?.userId,
                        },
                    })
                ).map((x) => x.type)

                const movie = await ctx.prisma.movie.findOne({
                    select: { title: true, year: true, genres: true },
                    // @ts-ignore
                    where: { id: parent.movieId },
                })

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
                    maybeTitle,
                    maybeYear,
                    maybeGenres,
                    solversCount,
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
        t.int('maybeYear', { nullable: true })
        t.string('maybeGenres', { list: true, nullable: true })
        t.int('solversCount')
    },
})

export const Movie = objectType({
    name: 'Movie',
    definition(t) {
        t.model.id()
        t.model.movieDBId()
    },
})
