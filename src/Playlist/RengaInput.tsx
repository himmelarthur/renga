import React, { useState } from 'react'
import { TBricks } from '../components/RengaForm/EmojiSelector'
import MovieAutocomplete, { MovieResult } from '../components/MovieAutoComplete'
import TextButton from '../components/TextButton'
import { Picker, BaseEmoji, Emoji } from 'emoji-mart'

type Props = {
    movie?: MovieResult
    onChangeMovie: (movie: MovieResult | undefined) => void
    emojis: TBricks
    onChangeEmojis: (emojis: TBricks) => void
}

const RengaInput = ({
    movie,
    emojis,
    onChangeEmojis,
    onChangeMovie,
}: Props) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="flex flex-col bg-gray-100 rounded p-4 ">
            <div className="flex items-center justify-center">
                <div className="w-1/2">
                    <MovieAutocomplete
                        movie={movie}
                        onMovieChange={onChangeMovie}
                        renderInput={(props) => (
                            // @ts-ignore
                            <input
                                className="appearance-none px-4 py-2 border-2 rounded w-full text-lg font-bold"
                                {...props}
                            />
                        )}
                        renderResult={({ movie, onClickChange }) => (
                            <div className="px-4 py-2 border-2 rounded w-full text-lg font-bold flex items-center justify-between">
                                <div className="flex-no-wrap whitespace-no-wrap truncate">
                                    {movie.title}
                                </div>
                                <TextButton
                                    className="text-sm pl-2"
                                    color="red"
                                    onClick={onClickChange}
                                >
                                    Change
                                </TextButton>
                            </div>
                        )}
                    ></MovieAutocomplete>
                </div>
                <div
                    className="flex justify-center items-center ml-8 hover:opacity-75 cursor-pointer relative"
                    onClick={() => setOpen(true)}
                >
                    <div className="w-16 h-16 rounded bg-gray-200 border-gray-300 flex items-center justify-center border mr-3">
                        {emojis[0] ? (
                            <Emoji
                                size={40}
                                native={false}
                                emoji={emojis[0].colons}
                            />
                        ) : undefined}
                    </div>
                    <div className="w-16 h-16 rounded bg-gray-200 border-gray-300 flex items-center justify-center border mr-3">
                        {emojis[1] ? (
                            <Emoji
                                size={40}
                                native={false}
                                emoji={emojis[1].colons}
                            />
                        ) : undefined}
                    </div>
                    <div className="w-16 h-16 rounded bg-gray-200 border-gray-300 flex items-center justify-center border">
                        {emojis[2] ? (
                            <Emoji
                                size={40}
                                native={false}
                                emoji={emojis[2].colons}
                            />
                        ) : undefined}
                    </div>
                </div>
            </div>
            {open ? (
                <div className="m-auto pt-4">
                    <Picker
                        title={''}
                        onSelect={(emoji: BaseEmoji) => {
                            switch (undefined) {
                                case emojis[0]:
                                    onChangeEmojis([
                                        emoji,
                                        emojis[1],
                                        emojis[2],
                                    ])
                                    break
                                case emojis[1]:
                                    onChangeEmojis([
                                        emojis[0],
                                        emoji,
                                        emojis[2],
                                    ])
                                    break
                                case emojis[2]:
                                    onChangeEmojis([
                                        emojis[0],
                                        emojis[1],
                                        emoji,
                                    ])
                                    break
                                default:
                                    break
                            }
                        }}
                    />
                </div>
            ) : undefined}
        </div>
    )
}

export default RengaInput
