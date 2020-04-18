import { queryType } from '@nexus/schema'

export const Query = queryType({
    definition(t) {
        t.crud.user()
        t.crud.renga()
        t.crud.rengas({ filtering: true, ordering: true })
        t.crud.party()
    },
})
