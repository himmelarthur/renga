import classNames from 'classnames'
import moment from 'moment'
import * as React from 'react'
import { GetRengaQuery } from '../../generated/graphql'
import { useHint } from './Hints'
import { track } from '../../utils/tracking'

export interface TimelineProps extends Pick<GetRengaQuery, 'renga'> {
    className?: string
    userId: number
}

export default ({ className, renga, userId }: TimelineProps) => {
    if (!renga?.submissions) return <div></div>
    const { submissions, status } = renga

    const [timelineMore, setTimelineMore] = React.useState(false)
    const shouldCut = (submissions.length || 0) > 5
    const isCut = !timelineMore && shouldCut
    const submissionsCut = submissions.slice(
        0,
        isCut ? 5 : submissions.length + 1
    )
    const hasHiddenAttemptsTitle = submissions.some(
        (x) => x.maybeTitle === null && !x.valid
    )
    const [spendHint] = useHint(userId, renga.id)

    return (
        <div className={classNames(className)}>
            {hasHiddenAttemptsTitle && (
                <div className="flex flex-row  mt-4 items-baseline space-x-2 text-sm ">
                    <span className="text-gray-600">
                        👀 All failed attempts
                    </span>
                    <button
                        onClick={() => {
                            track('Clicked use hint', {
                                rengaId: renga.id,
                                type: 'TIMELINE',
                            })
                            spendHint({
                                variables: {
                                    rengaId: renga.id,
                                    type: 'TIMELINE',
                                },
                            })
                        }}
                        className="font-semibold uppercase rounded text-primary focus:outline-nonetext-sm"
                    >
                        see for 1 💡
                    </button>
                </div>
            )}
            {submissionsCut?.map((s, index) => {
                const isMySubmission = s.author.id === userId
                return (
                    <div
                        className="flex my-4 items-center relative w-full"
                        key={s.id}
                    >
                        <div
                            className={classNames('absolute', {
                                'line-left bg-gray-400 h-16':
                                    submissionsCut.length - 1 !== index,
                                'line-left bg-gray-300 h-8':
                                    submissionsCut.length - 1 === index &&
                                    isCut,
                            })}
                        ></div>
                        <div
                            className={classNames(
                                'flex-shrink-0 w-4 h-4 rounded-full z-10',
                                {
                                    'bg-gray-400': !s.valid,
                                    'bg-teal-600': s.valid,
                                }
                            )}
                        ></div>
                        <div className="text-gray-600 flex flex-col ml-4 w-full">
                            <div className="w-full flex flex-row no-wrap space-x-1">
                                <span className="font-semibold text-gray-800 flex-shrink-0 truncate max-w-xs">
                                    {isMySubmission ? 'You' : s.author.username}
                                </span>{' '}
                                <span>{s.valid ? 'found' : 'tried'}</span>
                                <span className="font-semibold text-gray-800 truncate w-3/5">
                                    {status.isMine ||
                                    isMySubmission ||
                                    status.isResolved ? (
                                        s.maybeTitle
                                    ) : // It's not my renga
                                    s.valid ? (
                                        'the movie'
                                    ) : s.maybeTitle ? (
                                        // Display title if hint used
                                        s.maybeTitle
                                    ) : (
                                        // Display blur title if hint not used
                                        <span className="blur-1 rounded-full">
                                            'the movie'
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div className="text-sm">
                                {moment(s.createdAt).fromNow()}
                            </div>
                        </div>
                    </div>
                )
            })}
            {shouldCut && (
                <div className="flex flex-row justify-end">
                    <span
                        className="text-gray-600 cursor-pointer"
                        onClick={() => {
                            track('Clicked More Timeline', {
                                more: timelineMore,
                            })
                            setTimelineMore(!timelineMore)
                        }}
                    >
                        See {timelineMore ? 'less' : 'more'}
                    </span>
                </div>
            )}{' '}
        </div>
    )
}
