import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import {
    useGetPlaylistRengasQuery,
    useTryPlaylistRengaMutation,
} from '../generated/graphql'
import Renga from './Renga'
import { usePlaylistToken } from './hooks'

const Playlist = () => {
    const { playlistId } = useParams()
    const { token, updateToken, solvedRengas } = usePlaylistToken(playlistId!)
    const [trySubmission] = useTryPlaylistRengaMutation({
        onError: (error) => {},
        onCompleted: (data) => updateToken(data.tryPlaylistRenga),
        context: {
            headers: token
                ? {
                      'X-Playlist-Token': token,
                  }
                : {},
        },
    })
    const { loading, data } = useGetPlaylistRengasQuery({
        variables: { playlistId: playlistId! },
    })

    const handleSubmitMovie = useCallback(
        (rengaId: number, movieId: number) => {
            trySubmission({
                variables: { rengaId, movieId },
            })
        },
        [trySubmission]
    )

    if (loading || !data) return <div></div>
    const solvedRengasSet = new Set(solvedRengas)

    return (
        <div>
            <div>
                {solvedRengas.length}/{data.playlistRengas.length}
            </div>
            <div>
                {data.playlistRengas.map((renga) => (
                    <Renga
                        key={renga.id.toString()}
                        solved={solvedRengasSet.has(renga.id)}
                        renga={renga}
                        onSubmitMovie={(movieId: number) =>
                            handleSubmitMovie(renga.id, movieId)
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default Playlist
