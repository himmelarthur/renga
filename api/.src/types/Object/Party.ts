import { objectType } from '@nexus/schema'

export const Party = objectType({
    name: 'Party',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.users({ ordering: { score: true } })
    },
})
