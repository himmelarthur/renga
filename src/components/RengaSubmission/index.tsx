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
import BlurTitle from './BlurTitle'
import MovieAutocomplete, { MovieResult } from '../MovieAutoComplete'
import RengaSubmissionSkeleton from './Skeleton'

interface IRengaSubmissionProps {
    rengaId: number
    userId: number
    onSolved: () => void
    onClose: () => void
    partyId: string
}

gql`
    query getRenga($rengaId: Int!) {
        renga(where: { id: $rengaId }) {
            id
            emojis
            createdAt
            status {
                isResolved
                isMine
                maybeTitle
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
    onClose,
}) => {
    const { data, loading } = useGetRengaQuery({
        variables: { rengaId },
    })
    const [movie, setMovie] = React.useState<MovieResult | undefined>()

    const [createSubmission] = useCreateSubmissionMutation({
        onCompleted: (data) => {
            if (data?.createSubmission.valid) onSolved()
            setMovie(undefined)
        },
    })

    React.useEffect(() => {
        setMovie(undefined)
    }, [rengaId])

    const handleSubmission = React.useCallback(async () => {
        if (movie === undefined) return

        createSubmission({
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
    }, [movie, rengaId, createSubmission, partyId])
    if (loading || !data) return <RengaSubmissionSkeleton />

    const { renga } = data

    return (
        <div className="rounded p-4 bg-gray-100 flex flex-col relative">
            {(renga?.status.isResolved || renga?.status.isMine) && (
                <BlurTitle title={renga.status.maybeTitle} rengaId={rengaId} />
            )}
            <div
                className="absolute top-0 p-4 right-0 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={onClose}
            >
                ✕
            </div>
            <div className="w-full flex justify-center">
                {data.renga?.emojis.map((e, index) => {
                    return (
                        <span className="mx-2" key={index}>
                            <Emoji native emoji={e} size={48} />
                        </span>
                    )
                })}
            </div>
            <div className="text-gray-600 text-sm my-4">
                <Emoji size={16} native emoji={'male-artist'}></Emoji> Posted by{' '}
                <span className="font-medium">{renga?.author.username}</span>{' '}
                {moment(renga?.createdAt).fromNow()}
            </div>
            {!renga?.status.isResolved && !renga?.status.isMine && (
                <>
                    <MovieAutocomplete
                        movie={movie}
                        onMovieChange={setMovie}
                        placeholder="Your guess"
                    />
                    <button
                        className={classNames(
                            'p-4 text-gray-100 rounded mt-4 w-full font-medium outline-none',
                            {
                                'bg-green-500 hover:bg-green-300': !!movie,
                                'bg-green-500 opacity-50  cursor-default ': !movie,
                            }
                        )}
                        onClick={handleSubmission}
                        disabled={!movie}
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
                                        {isMe || renga.status.isResolved || !s.valid
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
