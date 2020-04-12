import * as React from 'react'
import classNames from 'classnames'
import gql from 'graphql-tag'
import {
    useGetRengaQuery,
    useCreateSubmissionMutation,
    GetRengaDocument,
    GetPlayersDocument,
} from '../../generated/graphql'
import { Emoji } from 'emoji-mart'
import moment from 'moment'
import MovieAutocomplete, { MovieResult } from '../MovieAutoComplete'

interface IRengaSubmissionProps {
    rengaId: number
    userId: number
    onSolved: () => void
    partyId: string
}

gql`
    query getRenga($rengaId: Int!) {
        renga(where: { id: $rengaId }) {
            id
            emojis
            createdAt
            isResolved
            isMine
            movie {
                maybeTitle
                movieDBId
            }
            author {
                id
                username
            }
            submissions(orderBy: { createdAt: desc }) {
                id
                author {
                    id
                    username
                }
                createdAt
                maybeTitle
                valid
            }
        }
    }

    mutation createSubmission(
        $rengaId: Int!
        $movieTitle: String!
        $movieDBId: Int!
    ) {
        createSubmission(
            rengaId: $rengaId
            movieDBId: $movieDBId
            movieTitle: $movieTitle
        ) {
            id
            valid
        }
    }
`

const RengaSubmission: React.FunctionComponent<IRengaSubmissionProps> = ({
    partyId,
    rengaId,
    userId,
    onSolved,
}) => {
    const { data, loading } = useGetRengaQuery({
        variables: { rengaId },
    })
    const [createSubmission] = useCreateSubmissionMutation()
    const [movie, setMovie] = React.useState<MovieResult | undefined>()

    const handleSubmission = React.useCallback(async () => {
        if (movie === undefined) throw new Error('Need movie')

        const response = await createSubmission({
            variables: {
                movieDBId: movie.id,
                rengaId,
                movieTitle: movie.title,
            },
            refetchQueries: [
                { query: GetRengaDocument, variables: { rengaId } },
                { query: GetPlayersDocument, variables: { partyId } },
            ],
        })
        if (response.data?.createSubmission.valid) {
            onSolved()
        }
    }, [movie, rengaId, createSubmission, onSolved, partyId])
    if (loading || !data) return <div></div>

    const { renga } = data

    return (
        <div className="rounded p-4 bg-gray-100 flex flex-col max-w-xl">
            <div className="w-full text-3xl font-bold text-center">
                {renga?.isResolved && renga.movie.maybeTitle}
            </div>
            <div className="w-full flex justify-center">
                {data.renga?.emojis.map((e) => {
                    return (
                        <span className="mx-2" key={e}>
                            <Emoji native emoji={e} size={48} />
                        </span>
                    )
                })}
            </div>
            <div className="text-gray-900 my-4">
                <Emoji size={16} native emoji={'painter'}></Emoji> Posted by{' '}
                <span className="font-semibold">{renga?.author.username}</span>{' '}
                {moment(renga?.createdAt).fromNow()}
            </div>
            {!renga?.isResolved && !renga?.isMine && (
                <>
                    <MovieAutocomplete
                        movie={movie}
                        onMovieChange={setMovie}
                        placeholder="You guess"
                    />
                    <button
                        className={classNames(
                            'p-4 text-gray-100 rounded mt-4 w-full',
                            {
                                'bg-green-700': !!movie,
                                'bg-green-500 opacity-50': !movie,
                            }
                        )}
                        onClick={handleSubmission}
                    >
                        Submit
                    </button>
                    <div className="h-px bg-gray-300"></div>
                </>
            )}
            <div className="w-full">
                {renga?.submissions?.map((s) => {
                    const isMe = s.author.id === userId
                    return (
                        <div className="flex my-4 items-center" key={s.id}>
                            <div
                                className={classNames('w-4 h-4 rounded-full', {
                                    'bg-gray-400': !s.valid,
                                    'bg-green-600': s.valid,
                                })}
                            ></div>
                            <div className="text-gray-600 flex flex-col ml-4">
                                <div>
                                    <span className="font-semibold text-gray-800">
                                        {isMe ? 'You' : s.author.username}
                                    </span>{' '}
                                    {s.valid ? 'found' : 'tried'}
                                    <span className="font-semibold text-gray-800">
                                        {' '}
                                        {isMe || renga.isResolved
                                            ? s.maybeTitle
                                            : 'the movie'}
                                    </span>
                                </div>
                                <div className="text-sm">
                                    {moment(s.createdAt).fromNow()}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RengaSubmission