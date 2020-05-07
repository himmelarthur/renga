import { objectType } from '@nexus/schema'

export const PlaylistRenga = objectType({
    name: 'PlaylistRenga',
    definition(t) {
        t.model.id()
        t.model.emojis()
    },
})
