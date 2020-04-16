import React, { useState, useLayoutEffect, Component, FC } from 'react'
import gql from 'graphql-tag'
import { useGetPlayersQuery } from '../../generated/graphql'
import classNames from 'classnames'
import pluralize from 'pluralize'
import { userEmoji } from '../../utils/emojis'
import { motion, useAnimation, AnimateSharedLayout } from 'framer-motion'
import { Emoji } from 'emoji-mart'
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
    const { data, loading, animationControl } = useFetchLeaderboard(
        partyId,
        userId
    )
    if (!data?.party) return <div></div>

    const {
        party: { users },
    } = data

    return (
        <div
            className={classNames(
                className,
                'max-w-md p-4 px-6 flex flex-col items-start bg-gray-100 rounded-md'
            )}
        >
            <AnimateSharedLayout>
                <h3 className="text-gray-800 text-2xl font-bold">
                    Leaderboard
                </h3>
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
                                <div className="flex items-center">
                                    <div className="w-4 text-center text-gray-400">
                                        {index === 0 ? '🏅' : `#${index + 1}`}
                                    </div>
                                    <div className="ml-3 mr-2">
                                        {player.username}
                                    </div>
                                    <Emoji
                                        size={16}
                                        native
                                        emoji={userEmoji(partyId, player.id)}
                                    />
                                </div>
                                <div className="text-gray-600">
                                    {pluralize('point', player.score, true)}
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
