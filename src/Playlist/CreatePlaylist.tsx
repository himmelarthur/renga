import React, { useState } from 'react'
import { useCreatePlaylistMutation } from '../generated/graphql'
import Button from '../components/Button'
import EmojiSelector, { TBricks } from '../components/RengaForm/EmojiSelector'
import RengaInput from './RengaInput'
import { MovieResult } from '../components/MovieAutoComplete'
import moment from 'moment'

const CreatePlaylist = () => {
    const [create] = useCreatePlaylistMutation()
    const [rengas, setRengas] = useState<
        { emojis: TBricks; movie?: MovieResult }[]
    >([{ emojis: [undefined, undefined, undefined] }])
    return (
        <div>
            <h1 className="text-center my-4 text-3xl font-logo text-primary">
                New Playlist
            </h1>
            <div className="flex justify-center flex-col w-1/2 m-auto">
                {rengas.map((renga, i) => (
                    <div className="mb-4">
                        <RengaInput
                            key={i.toString()}
                            movie={renga.movie}
                            emojis={renga.emojis}
                            onChangeEmojis={(emojis) =>
                                setRengas(
                                    rengas.map((_r, j) => ({
                                        ..._r,
                                        emojis: i === j ? emojis : _r.emojis,
                                    }))
                                )
                            }
                            onChangeMovie={(movie) =>
                                setRengas(
                                    rengas.map((_r, j) => ({
                                        ..._r,
                                        movie: i === j ? movie : _r.movie,
                                    }))
                                )
                            }
                        />
                    </div>
                ))}
                <div
                    className="w-16 h-16 bg-gray-300 text-white text-4xl flex justify-center items-center rounded-full m-auto my-4 cursor-pointer hover:bg-gray-200"
                    onClick={() =>
                        setRengas([
                            ...rengas,
                            { emojis: [undefined, undefined, undefined] },
                        ])
                    }
                >
                    +
                </div>
            </div>
            <div className="w-1/5 m-auto my-4">
                <Button
                    className="z-0"
                    onClick={() =>
                        create({
                            variables: {
                                playlistId: Math.random()
                                    .toString(36)
                                    .substr(2, 9),
                                rengas: rengas
                                    .reduce<
                                        {
                                            movie: MovieResult
                                            emojis: string[]
                                        }[]
                                    >((prev, curr) => {
                                        if (!curr.movie) return prev
                                        const emojis = curr.emojis.reduce<
                                            string[] | undefined
                                        >(
                                            (p, c) =>
                                                c === undefined ||
                                                p === undefined
                                                    ? undefined
                                                    : [...p, c.colons],
                                            []
                                        )
                                        if (!emojis) return prev
                                        return [
                                            ...prev,
                                            {
                                                movie: curr.movie,
                                                emojis: emojis,
                                            },
                                        ]
                                    }, [])
                                    .map((renga) => ({
                                        movie: {
                                            create: {
                                                title: renga.movie.title,
                                                movieDBId: renga.movie.id,
                                                year: +moment(
                                                    renga.movie.release_date
                                                ).format('YYYY'),
                                            },
                                        },
                                        title: renga.movie.title,
                                        emojis: { set: renga.emojis },
                                    })),
                            },
                        })
                    }
                >
                    Create
                </Button>
            </div>
        </div>
    )
}

export default CreatePlaylist
