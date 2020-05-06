import { queryType } from '@nexus/schema'

export const Query = queryType({
    definition(t) {
        t.crud.account()
        t.crud.user()
        t.crud.renga()
        t.crud.rengas({
            filtering: true,
            ordering: {
                createdAt: true,
                likeCount: true,
                attemptCount: true,
                solverCount: true,
                successRatio: true,
            },
            pagination: true,
        })
        t.crud.party()
    },
})
