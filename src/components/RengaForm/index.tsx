import * as React from 'react'
import moment from 'moment'
import gql from 'graphql-tag'
import { useCreateRengaMutation } from '../../generated/graphql'
import EmojiSelector, { TBricks as TEmojis } from './EmojiSelector'
import classNames from 'classnames'
import MovieAutocomplete, { MovieResult } from '../MovieAutoComplete'

gql`
    mutation createRenga(
        $authorId: Int!
        $partyId: String!
        $emojis: [String!]!
        $movieId: Int!
        $movieTitle: String!
        $movieYear: Int!
    ) {
        createOneRenga(
            data: {
                emojis: { set: $emojis }
                author: { connect: { id: $authorId } }
                party: { connect: { id: $partyId } }
                movie: {
                    create: {
                        movieDBId: $movieId
                        title: $movieTitle
                        year: $movieYear
                    }
                }
            }
        ) {
            id
            emojis
        }
    }
`

export interface IRengaFormProps {
    userId: number
    partyId: string
}

export default ({ userId, partyId }: IRengaFormProps) => {
    const [createRenga] = useCreateRengaMutation()
    const [movie, setMovie] = React.useState<MovieResult | undefined>()
    const [emojis, setEmojis] = React.useState<TEmojis>([
        undefined,
        undefined,
        undefined,
    ])

    const isValid = () => {
        return emojis.filter((x) => x).length === 3 && movie !== undefined
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const emojiIds: string[] = emojis
            .filter((x) => x)
            .map((x) => x?.id ?? '')

        if (emojiIds.length < 3) {
            throw Error('Need 3 emojis')
        }

        if (!movie) {
            throw Error('Need movie')
        }

        createRenga({
            variables: {
                authorId: userId,
                emojis: emojiIds,
                movieId: movie.id,
                movieTitle: movie.title,
                movieYear: parseInt(moment(movie.release_date).format('YYYY')),
                partyId,
            },
        })
        e.stopPropagation()
        e.preventDefault()
    }

    return (
            <form onSubmit={handleSubmit}>
                <div className="bg-gray-200 p-4 rounded-lg mb-3">
                    <h3 className="text-xl text-gray-900 font-bold mb-2">
                        Make people guess a movie...
                    </h3>
                    <MovieAutocomplete movie={movie} onMovieChange={setMovie} />
                </div>
                <div className="bg-gray-200 p-4 rounded-lg">
                    <h3 className="text-xl text-gray-900 font-bold mb-2">
                        ...with <span className="text-red-500">three</span> emojis
                    </h3>
                    <EmojiSelector emojis={emojis} onEmojisChange={setEmojis} />
                </div>
                <input
                    className={classNames(
                        'p-4 text-gray-100 rounded mt-4 w-full',
                        {
                            'bg-green-700': isValid(),
                            'bg-green-500 opacity-50': !isValid(),
                        }
                    )}
                    type="submit"
                    value="Submit Renga"
                    disabled={!isValid()}
                />
            </form>
    )
}
