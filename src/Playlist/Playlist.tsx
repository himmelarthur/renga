import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import {
    useGetPlaylistRengasQuery,
    useTryPlaylistRengaMutation,
    GetPlaylistRengasDocument,
} from '../generated/graphql'
import Renga from './Renga'
import { usePlaylist } from './hooks'

const Playlist = () => {
    const { playlistId } = useParams()
    const {
        token,
        updateToken,
        solvedRengas,
        loading,
        data,
        refetch,
    } = usePlaylist(playlistId!)
    const [trySubmission] = useTryPlaylistRengaMutation({
        onError: (error) => {},
        refetchQueries: ({ data }) => {
            console.warn(data.tryPlaylistRenga)

            if (data && data.tryPlaylistRenga) {
                return [
                    {
                        query: GetPlaylistRengasDocument,
                        variables: { playlistId },
                        context: {
                            headers: {
                                'X-Playlist-Token': data.tryPlaylistRenga,
                            },
                        },
                    },
                ]
            }

            return []
        },
        onCompleted: (data) => {
            updateToken(data.tryPlaylistRenga)
        },
        context: {
            headers: token
                ? {
                      'X-Playlist-Token': token,
                  }
                : {},
        },
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
            <canvas
                id="confetti"
                style={{ position: 'fixed', top: 0, zIndex: -1 }}
            ></canvas>
            <div className="sm:p-10 p-4">
                <div className="mb-4">
                    <div className="flex flex-row items-center justify-between">
                        <h1 className="text-primary font-logo text-3xl">
                            Renga
                        </h1>
                    </div>
                </div>
                <div className="text-center font-medium text-2xl text-gray-900">
                    {solvedRengas.length} / {data.playlistRengas.length}
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
        </div>
    )
}

export default Playlist
