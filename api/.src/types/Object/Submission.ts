import { objectType } from '@nexus/schema'
import { Context } from '../../context'
import { HintType } from '@prisma/client'

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
