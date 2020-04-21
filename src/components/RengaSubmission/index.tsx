import classNames from 'classnames'
import { Emoji } from 'emoji-mart'
import gql from 'graphql-tag'
import isMobile from 'is-mobile'
import moment from 'moment'
import { useDeleteRenga } from './hooks'
import * as React from 'react'
import {
    GetPlayersDocument,
    GetRengaDocument,
    useCreateSubmissionMutation,
    useGetRengaQuery,
} from '../../generated/graphql'
import { track } from '../../utils/tracking'
import MovieAutocomplete, { MovieResult } from '../MovieAutoComplete'
import BlurTitle from './BlurTitle'
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
            deletedAt
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
        fetchPolicy: 'network-only',
        variables: { rengaId },
    })
    const [movie, setMovie] = React.useState<MovieResult | undefined>()

    const [createSubmission] = useCreateSubmissionMutation({
        onCompleted: (data) => {
            if (data?.createSubmission.valid) {
                onSolved()
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

    if (loading || !data) return <RengaSubmissionSkeleton />

    const { renga } = data

    return (
        <div className="rounded p-4 bg-gray-100 flex flex-col relative w-full">
            <div className="text-gray-600 text-sm">
                <Emoji
                    size={16}
                    native={isMobile()}
                    emoji={'male-artist'}
                ></Emoji>{' '}
                Posted by{' '}
                <span className="font-medium">{renga?.author.username}</span>{' '}
                {moment(renga?.createdAt).fromNow()}
            </div>
            <div
                className="absolute top-0 pr-4 pt-3 text-gray-600 hover:text-gray-700 cursor-pointer text-xl right-0"
                onClick={onClose}
            >
                ✕
            </div>
            <div className="w-full flex justify-center my-8">
                {data.renga?.emojis.map((e, index) => {
                    return (
                        <div
                            className="mx-2 bg-white rounded-lg mx-2 sm:h-16 sm:w-16 h-12 w-12 text-3xl sm:text-5xl text-center"
                            key={index}
                        >
                            <Emoji native={false} emoji={e} size={42} />
                        </div>
                    )
                })}
            </div>
            {(renga?.status.isResolved || renga?.status.isMine) && (
                <div className="pb-8 mb-2 flex flex-row justify-center items-end w-full relative">
                    <BlurTitle
                        title={renga.status.maybeTitle}
                        rengaId={rengaId}
                    />
                    {renga?.status.isMine && (
                        <div
                            className="text-sm uppercase text-red-700 cursor-pointer absolute bottom-0 right-0"
                            onClick={() => handleDelete(rengaId)}
                        >
                            DELETE
                        </div>
                    )}
                </div>
            )}
            {!renga?.status.isResolved && !renga?.status.isMine && (
                <div className="my-4">
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
            <div className="h-px w-full bg-white"></div>
            <div className="flex flex-row items-center w-full justify-between py-3">
                <div className="flex flex-row text-gray-600 font-light leading-none items-baseline">
                    <svg
                        width="28"
                        height="24"
                        viewBox="0 0 28 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.0004 23.76L13.5204 23.36C3.20039 14.96 0.400391 12 0.400391 7.2C0.400391 3.2 3.60039 0 7.60039 0C10.8804 0 12.7204 1.84 14.0004 3.28C15.2804 1.84 17.1204 0 20.4004 0C24.4004 0 27.6004 3.2 27.6004 7.2C27.6004 12 24.8004 14.96 14.4804 23.36L14.0004 23.76ZM7.60039 1.6C4.48039 1.6 2.00039 4.08 2.00039 7.2C2.00039 11.28 4.56039 14 14.0004 21.68C23.4404 14 26.0004 11.28 26.0004 7.2C26.0004 4.08 23.5204 1.6 20.4004 1.6C17.6004 1.6 16.0804 3.28 14.8804 4.64L14.0004 5.68L13.1204 4.64C11.9204 3.28 10.4004 1.6 7.60039 1.6Z"
                            fill="currentColor"
                        />
                    </svg>
                    <span>1</span>
                </div>
                <div className="text-gray-600 font-light">
                    🙌 Resolved by{' '}
                    {renga?.submissions.filter((x) => x.valid).length} people
                </div>
            </div>
            <div className="h-px w-full bg-white"></div>
            <div className="w-full">
                {renga?.submissions?.map((s) => {
                    const isMe = s.author.id === userId
                    return (
                        <div className="flex my-4 items-center" key={s.id}>
                            <div
                                className={classNames('w-4 h-4 rounded-full', {
                                    'bg-gray-400': !s.valid,
                                    'bg-teal-600': s.valid,
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
                                        {isMe ||
                                        renga.status.isResolved ||
                                        !s.valid
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
