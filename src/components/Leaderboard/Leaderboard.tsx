import React from 'react'
import classNames from 'classnames'
import { Emoji } from 'emoji-mart'
import { AnimateSharedLayout, motion } from 'framer-motion'
import pluralize from 'pluralize'
import { userEmoji } from '../../utils/emojis'
import { useFetchLeaderboard } from './hooks'

interface ILeaderboardProps {
    partyId: string
    userId?: number
    className?: string
}

const Leaderboard: React.FunctionComponent<ILeaderboardProps> = ({
    partyId,
    userId,
    className,
}) => {
    const { data, animationControl } = useFetchLeaderboard(partyId, userId)
    if (!data?.party) return <div></div>

    const {
        party: { users },
    } = data

    return (
        <div
            className={classNames(
                className,
                'p-4 px-6 flex flex-col items-start bg-gray-100 rounded-md'
            )}
        >
            <AnimateSharedLayout>
                <div className="flex sm:flex-row flex-col justify-between w-full items-baseline">
                    <h3 className="text-gray-800 text-2xl font-bold">
                        Leaderboard
                    </h3>
                    <div className="flex flex-row sm:mt-0 mt-2">
                        <div className="flex flex-row items-baseline">
                            <span className="font-medium text-sm text-gray-800">
                                🎬{data.user?.postedCount ?? 0}
                            </span>
                            <span className="ml-1 uppercase text-gray-600 text-xs">
                                created
                            </span>
                        </div>
                        <div className="flex flex-row items-baseline ml-2">
                            <span className="font-medium text-sm text-gray-800">
                                🔍{data.user?.solvedCount ?? 0}
                            </span>
                            <span className="ml-1 uppercase text-gray-600 text-xs">
                                solved
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full text-gray-600 my-2">
                    {users.map((player, index) => {
                        const isMe = userId === player.id
                        return (
                            <motion.div
                                animate={isMe ? animationControl : undefined}
                                key={player.id}
                                layoutId={player.id.toString()}
                                className={classNames(
                                    'my-3 flex justify-between',
                                    {
                                        'font-medium': isMe,
                                        'text-gray-700': isMe,
                                    }
                                )}
                            >
                                <div className="flex items-center w-4/5">
                                    <div className="text-center text-gray-400 w-8 flex justify-end flex-shrink-0">
                                        {index === 0 ? '🏅' : `#${index + 1}`}
                                    </div>
                                    <div className="ml-3 truncate mr-2 flex-grow-0">
                                        {player.username}
                                    </div>
                                    <Emoji
                                        size={16}
                                        native
                                        emoji={userEmoji(partyId, player.id)}
                                    />
                                </div>
                                <div className="text-gray-600 text-sm">
                                    {pluralize('pt', player.score, true)}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </AnimateSharedLayout>
            <div className="text-xs text-gray-500 text-right w-full">
                Solving a Renga first gives 2 points, 1 point otherwise
            </div>
        </div>
    )
}

export default Leaderboard
