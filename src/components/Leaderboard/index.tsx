import React, { useState, useLayoutEffect, Component, FC } from 'react'
import gql from 'graphql-tag'
import { useGetPlayersQuery } from '../../generated/graphql'
import classNames from 'classnames'
import pluralize from 'pluralize'
import { userEmoji } from '../../utils/emojis'
import { motion, useAnimation, AnimateSharedLayout } from 'framer-motion'
import { Emoji } from 'emoji-mart'

interface ILeaderboardProps {
    partyId: string
    userId?: number
    className?: string
}

gql`
    query getPlayers($partyId: String!) {
        party(where: { id: $partyId }) {
            id
            users(orderBy: { score: desc }) {
                id
                username
                score
            }
        }
    }
`

const Leaderboard: React.FunctionComponent<ILeaderboardProps> = ({
    partyId,
    userId,
    className,
}) => {
    const [userScore, setUserScore] = useState<number>()
    const { data } = useGetPlayersQuery({
        variables: { partyId },
        pollInterval: Number(process.env.REACT_APP_POLL_INTERVAL) || undefined,
        onCompleted: (data) =>
            setUserScore(
                data.party?.users.find(({ id }) => id === userId)?.score
            ),
    })

    const myScoreAnimationControl = useAnimation()

    useLayoutEffect(() => {
        const newUserScore = data?.party?.users.find(({ id }) => id === userId)
            ?.score
        if (newUserScore && userScore && newUserScore > userScore) {
            myScoreAnimationControl.start({
                scale: [1, 1.3, 1],
                transition: { delay: 1, duration: 0.5 },
            })
        }
        setUserScore(newUserScore)
    }, [data, userScore])

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
                <div className="w-full text-gray-600 text-sm">
                    {users.map((player, index) => {
                        const isMe = userId === player.id
                        return (
                            <motion.div
                                animate={
                                    isMe ? myScoreAnimationControl : undefined
                                }
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
        </div>
    )
}

export default Leaderboard
