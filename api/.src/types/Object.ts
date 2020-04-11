import { objectType } from '@nexus/schema'

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


export const Renga = objectType({
    name: 'Renga',
    definition(t) {
        t.model.id()
        t.model.emojis()
    }
})
