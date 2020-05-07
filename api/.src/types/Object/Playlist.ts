import { objectType } from '@nexus/schema'
import { Context } from '../../context'
import { verify } from 'jsonwebtoken'
import { appSecret } from '../../security/authentication'

export const PlaylistRenga = objectType({
    name: 'PlaylistRenga',
    definition(t) {
        t.model.id()
        t.model.emojis()
        t.string('title', {
            nullable: true,
            resolve: async ({ title, id }, _, context: Context) => {
                let rengaIds: number[] = []

                try {
                    const playlistToken = context.headers[
                        'x-playlist-token'
                    ] as string
                    console.warn(playlistToken)
                    const decodedToken = verify(playlistToken, appSecret()) as {
                        rengaIds: number[]
                    }
                    rengaIds = decodedToken.rengaIds
                } catch (err) {}
                if (new Set(rengaIds).has(id)) {
                    return title
                }
                return undefined
            },
        })
    },
})
