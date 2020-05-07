import React from 'react'
import { Emoji } from 'emoji-mart'
import MovieAutocomplete from '../components/MovieAutoComplete'

const Renga = ({ renga, solved, onSubmitMovie }: Props) => {
    return (
        <div>
            <div>
                {renga.emojis.map((emoji, i) => (
                    <Emoji
                        key={i}
                        size={24}
                        native={false}
                        emoji={emoji}
                    ></Emoji>
                ))}
            </div>
            {solved ? (
                <div>Solved</div>
            ) : (
                <MovieAutocomplete
                    movie={undefined}
                    onMovieChange={(movie) => {
                        if (!movie) return
                        onSubmitMovie(movie.id)
                    }}
                />
            )}
        </div>
    )
}

type Props = {
    solved: boolean
    renga: {
        id: number
        emojis: string[]
    }
    onSubmitMovie: (movieId: number) => void
}

export default Renga
