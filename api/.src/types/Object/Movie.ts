import { objectType } from '@nexus/schema'

export const Movie = objectType({
    name: 'Movie',
    definition(t) {
        t.model.id()
        t.model.movieDBId()
    },
})
