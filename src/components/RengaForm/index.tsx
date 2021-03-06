import classNames from 'classnames'
import gql from 'graphql-tag'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { DEFAULT_RENGAS_PAGE_COUNT } from '../../client'
import {
    GetRengasDocument,
    GetUserDocument,
    useCreateRengaMutation,
    useHasMovieLazyQuery,
    OrderByArg,
} from '../../generated/graphql'
import { track } from '../../utils/tracking'
import Button from '../Button'
import MovieAutocomplete, { MovieResult } from '../MovieAutoComplete'
import DEFAULT_MOVIES from './defaultMovies'
import EmojiSelector, { TBricks as TEmojis } from './EmojiSelector'

gql`
    query hasMovie($partyId: String!, $movieId: Int!) {
        rengas(
            where: {
                movie: { movieDBId: { equals: $movieId } }
                partyId: { equals: $partyId }
            }
        ) {
            id
        }
    }
`

gql`
    mutation createRenga(
        $authorId: Int!
        $partyId: String!
        $emojis: [String!]!
        $movieId: Int!
        $movieTitle: String!
        $movieYear: Int!
        $movieGenres: [Int!]
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
                        genres: { set: $movieGenres }
                    }
                }
            }
        ) {
            id
            emojis
        }
    }
`

const useMovieDuplication = (
    partyId: string,
    movie: MovieResult | undefined
) => {
    const [isMovieAlreadyUsed, setIsMovieAlreadyUsed] = useState(false)
    const [hasMovie, { called }] = useHasMovieLazyQuery({
        onCompleted: (data) => {
            const isDuplicated = data.rengas.length !== 0
            if (isDuplicated) track('Selected Movie Already Exist')
            setIsMovieAlreadyUsed(isDuplicated)
        },
    })

    useEffect(() => {
        if (movie) {
            hasMovie({
                variables: { partyId, movieId: movie?.id },
            })
        } else {
            setIsMovieAlreadyUsed(false)
        }
    }, [movie, partyId, hasMovie])
    return { isMovieAlreadyUsed, isMovieChecked: called }
}

export interface IRengaFormProps {
    userId: number
    partyId: string
    onCreated: () => void
    onClose: () => void
}

export default ({ userId, partyId, onCreated, onClose }: IRengaFormProps) => {
    const [movieIsFromSuggestion, setMovieIsFromSuggestion] = React.useState(
        false
    )
    const [createRenga] = useCreateRengaMutation()
    const [movie, setMovie] = React.useState<MovieResult | undefined>()
    const { isMovieAlreadyUsed, isMovieChecked } = useMovieDuplication(
        partyId,
        movie
    )
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
            .map((x) => x?.colons ?? '')

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
                movieGenres: movie.genre_ids,
                partyId,
            },
            refetchQueries: [
                {
                    query: GetRengasDocument,
                    variables: {
                        partyId,
                        first: DEFAULT_RENGAS_PAGE_COUNT,
                        skip: 0,
                        orderBy: { createdAt: OrderByArg.Desc },
                    },
                },
                { query: GetUserDocument, variables: { userId } },
            ],
        })
        track('Created Renga', {
            movieId: movie.id,
            movieTitle: movie.title,
            emojis: emojiIds.join(''),
            fromSuggestion: movieIsFromSuggestion,
            isDuplicate: isMovieChecked ? isMovieAlreadyUsed : null,
        })
        e.stopPropagation()
        e.preventDefault()
        onCreated()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex sm:flex-row flex-col items-start w-full"
        >
            <div className="bg-gray-100 p-4 rounded-lg mb-3 relative w-full sm:w-5/6">
                <h3 className="sm:text-xl text-gray-800 font-bold mb-2">
                    Make people guess a movie...
                </h3>
                <MovieAutocomplete
                    movie={movie}
                    onMovieChange={(movie) => {
                        setMovie(movie)
                        setMovieIsFromSuggestion(false)
                    }}
                />
                <div className="flex text-sm text-gray-500 mt-2 justify-between">
                    <span
                        className={classNames('text-orange-500', {
                            invisible: !isMovieAlreadyUsed,
                        })}
                    >
                        ⚠️ This movie has been already used in another renga
                    </span>
                    <button
                        className="text-primary underline pl-1 cursor-pointer flex-shrink-0"
                        onClick={() => {
                            track('Picked Suggestion')
                            setMovie(
                                DEFAULT_MOVIES[
                                    Math.floor(
                                        Math.random() * DEFAULT_MOVIES.length
                                    )
                                ]
                            )
                            setMovieIsFromSuggestion(true)
                        }}
                    >
                        Pick one for me!
                    </button>
                </div>
                <div
                    className="absolute top-0 p-4 right-0 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={onClose}
                >
                    ✕
                </div>
                <h3 className="sm:text-xl text-gray-800 font-bold my-2">
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
