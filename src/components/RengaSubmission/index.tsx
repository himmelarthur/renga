import classNames from 'classnames'
import { Emoji } from 'emoji-mart'
import gql from 'graphql-tag'
import isMobile from 'is-mobile'
import moment from 'moment'
import * as React from 'react'
import pluralize from 'pluralize'
import {
    GetPlayersDocument,
    GetRengaDocument,
    useCreateSubmissionMutation,
    useGetRengaQuery,
} from '../../generated/graphql'
import { track } from '../../utils/tracking'
import MovieAutocomplete, { MovieResult } from '../MovieAutoComplete'
import BlurTitle from './BlurTitle'
import { useDeleteRenga } from './hooks'
import RengaSubmissionSkeleton from './Skeleton'
import Timeline from './Timeline'
import Hints from './Hints'
import TextButton from '../TextButton'
import Like from './Like'

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
            deletedAt
            likeCount
            status {
                isResolved
                isMine
                maybeTitle
                maybeYear
                maybeGenres
                isLiked
                solversCount
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
        fetchPolicy: 'network-only',
        variables: { rengaId },
    })
    const [movie, setMovie] = React.useState<MovieResult>()
    const [justResolved, setJustResolved] = React.useState(false)

    const [createSubmission] = useCreateSubmissionMutation({
        onCompleted: (data) => {
            if (data?.createSubmission.valid) {
                onSolved()
                setJustResolved(true)
            }
            setMovie(undefined)
        },
    })

    const { handleDelete } = useDeleteRenga()

    React.useEffect(() => {
        setMovie(undefined)
    }, [rengaId])

    const handleSubmission = React.useCallback(async () => {
        if (movie === undefined) return
        track('Tried Submission', {
            rengaId,
            movieId: movie.id,
            movieTitle: movie.title,
        })
        createSubmission({
            variables: {
                movieDBId: movie.id,
                rengaId,
                movieTitle: movie.title,
            },
            refetchQueries: [
                { query: GetRengaDocument, variables: { rengaId } },
                { query: GetPlayersDocument, variables: { partyId, userId } },
            ],
        })
    }, [movie, rengaId, createSubmission, partyId, userId])

    React.useEffect(() => {
        const enterListener = (event: KeyboardEvent) => {
            if (event.code === 'Enter') {
                track('Submit with enter')
                handleSubmission()
            }
        }
        document.addEventListener('keydown', enterListener)
        return () => document.removeEventListener('keydown', enterListener)
    }, [handleSubmission])

    if (loading || !data || !data.renga) return <RengaSubmissionSkeleton />

    const { renga } = data

    return (
        <div className="rounded bg-gray-100 flex flex-col w-full mb-4">
            <div className="relative">
                <div className="text-gray-600 text-sm relative flex flex-row space-x-1 items-baseline p-4 sm:p-6">
                    <Emoji
                        size={16}
                        native={isMobile()}
                        emoji={'male-artist'}
                    ></Emoji>{' '}
                    <span className="flex-shrink-0">Posted by </span>
                    <span className="font-medium truncate text-gray-700">
                        {renga.status.isMine ? 'You' : renga.author.username}
                    </span>{' '}
                    <span className="flex-shrink-0">
                        {moment(renga?.createdAt).fromNow()}
                    </span>
                    <div
                        className="absolute top-0 p-4 text-gray-600 hover:text-gray-700 cursor-pointer text-xl right-0"
                        onClick={onClose}
                    >
                        ✕
                    </div>
                </div>
                <div className="w-full flex justify-center my-8">
                    {data.renga?.emojis.map((e, index) => {
                        return (
                            <div
                                className="mx-2 bg-white rounded-lg mx-2 sm:h-16 sm:w-16 h-12 w-12 text-3xl sm:text-5xl text-center flex items-center justify-center"
                                key={index}
                            >
                                <Emoji
                                    native={false}
                                    emoji={e}
                                    size={isMobile() ? 32 : 42}
                                />
                            </div>
                        )
                    })}
                </div>
                {(renga?.status.isResolved || renga?.status.isMine) && (
                    <div className="pb-8 flex flex-row justify-center items-end w-full">
                        <BlurTitle
                            title={renga.status.maybeTitle}
                            rengaId={rengaId}
                        />
                    </div>
                )}
                <Hints
                    className="px-4 sm:px-6"
                    rengaId={renga?.id}
                    userId={userId}
                    year={renga.status.maybeYear}
                    genres={renga.status.maybeGenres}
                />
                {renga?.status.isMine && (
                    <TextButton
                        color="red"
                        className="absolute bottom-0 right-0 my-2 text-sm mx-4 sm:mx-6"
                        onClick={() => handleDelete(rengaId)}
                    >
                        Delete
                    </TextButton>
                )}
            </div>
            {!renga?.status.isResolved && !renga?.status.isMine && (
                <div className="my-4 px-4 sm:px-6">
                    <MovieAutocomplete
                        movie={movie}
                        onMovieChange={setMovie}
                        placeholder="Your guess"
                    />
                    <button
                        className={classNames(
                            'p-4 text-gray-100 rounded w-full mt-4 font-medium outline-none',
                            {
                                'bg-teal-500 hover:bg-teal-600': !!movie,
                                'bg-teal-500 opacity-50  cursor-default ': !movie,
                            }
                        )}
                        onClick={handleSubmission}
                        disabled={!movie}
                    >
                        Submit
                    </button>
                </div>
            )}
            {justResolved ? (
                <Like
                    rengaId={rengaId}
                    userId={userId}
                    isLiked={renga.status.isLiked}
                />
            ) : undefined}

            <div className="flex flex-row items-center w-full justify-between py-3 px-4 sm:px-6">
                <div className="flex flex-row text-gray-600 text-sm leading-none items-baseline">
                    ❤️ {renga.likeCount}
                </div>
                <div className="text-gray-600 text-sm">
                    <span aria-label="" role="img" className="mr-2">
                        🙌
                    </span>{' '}
                    Solved{' '}
                    {pluralize(
                        'time',
                        renga.submissions.filter((x) => x.valid).length,
                        true
                    )}
                </div>
            </div>
            <Timeline
                className="w-full text-sm sm:text-base overflow-auto px-4 sm:px-6"
                renga={renga}
                userId={userId}
            />
        </div>
    )
}

export default RengaSubmission
