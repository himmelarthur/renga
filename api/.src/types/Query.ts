import { queryType } from '@nexus/schema'

export const Query = queryType({
    definition(t) {
        t.crud.users()
        t.crud.renga()
        t.crud.rengas({ filtering: true, ordering: true })
        t.crud.party()
        t.crud.chatMessages({ filtering: true, ordering: true })
    },
})
