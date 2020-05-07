import React from 'react'
import { Emoji } from 'emoji-mart'
import MovieAutocomplete from '../components/MovieAutoComplete'

const Renga = ({ renga, solved, onSubmitMovie }: Props) => {
    return (
        <div className="flex items-center justify-center my-6">
            <div className="w-56 flex justify-end mr-4">
                {renga.emojis.map((emoji, i) => (
                    <Emoji
                        key={i}
                        size={24}
                        native={false}
                        emoji={emoji}
                    ></Emoji>
                ))}
            </div>
            <div className="w-64 ml-4">
                {solved ? (
                    <div className="text-gray-700 text-sm">{renga.title}</div>
                ) : (
                    <MovieAutocomplete
                        inputClassName={
                            'appearance-none p-2 px-4 border-2 rounded font-bold text-lg'
                        }
                        movie={undefined}
                        onMovieChange={(movie) => {
                            if (!movie) return
                            onSubmitMovie(movie.id)
                        }}
                    />
                )}
            </div>
        </div>
    )
}

type Props = {
    solved: boolean
    renga: {
        id: number
        emojis: string[]
        title?: string | null
    }
    onSubmitMovie: (movieId: number) => void
}

export default Renga
