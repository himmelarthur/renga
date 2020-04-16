import * as React from 'react'
import moment from 'moment'
import gql from 'graphql-tag'
import {
    useCreateRengaMutation,
    GetRengasDocument,
} from '../../generated/graphql'
import EmojiSelector, { TBricks as TEmojis } from './EmojiSelector'
import classNames from 'classnames'
import MovieAutocomplete, { MovieResult } from '../MovieAutoComplete'
import Button from '../Button'

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
    onCreated: () => void
    onClose: () => void
}

export default ({ userId, partyId, onCreated, onClose }: IRengaFormProps) => {
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

    const handleSubmit = (e: React.FormEvent) => {
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
            refetchQueries: [
                { query: GetRengasDocument, variables: { partyId } },
            ],
        })
        window.heap?.track('Created Renga', {
            movieId: movie.id,
            movieTitle: movie.title,
            emojis: emojiIds.join(''),
        })
        e.stopPropagation()
        e.preventDefault()
        onCreated()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex sm:flex-row flex-col items-start"
        >
            <div className="bg-gray-100 p-4 rounded-lg mb-3 relative w-full sm:w-5/6">
                <h3 className="text-xl text-gray-800 font-bold mb-2">
                    Make people guess a movie...
                </h3>
                <MovieAutocomplete movie={movie} onMovieChange={setMovie} />
                <div
                    className="absolute top-0 p-4 right-0 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={onClose}
                >
                    ✕
                </div>
                <h3 className="text-xl text-gray-800 font-bold my-2">
                    ...with <span className="text-primary">three</span> emojis
                </h3>
                <EmojiSelector emojis={emojis} onEmojisChange={setEmojis} />
            </div>
            <Button
                className={classNames('sm:w-48 sm:ml-4 sm:mt-0')}
                disabled={!isValid()}
                onClick={handleSubmit}
            >
                Create Renga
            </Button>
        </form>
    )
}
