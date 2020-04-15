import * as React from 'react'
import gql from 'graphql-tag'
import { useGetPlayersQuery } from '../../generated/graphql'
import classNames from 'classnames'

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
    const { data } = useGetPlayersQuery({
        variables: { partyId },
        pollInterval: 6000,
    })
    if (!data?.party) return <div></div>
    const {
        party: { users },
    } = data

    return (
        <div
            className={classNames(
                className,
                'max-w-md p-4 flex flex-col items-start pt-0'
            )}
        >
            <h3 className="text-gray-700 text-2xl font-bold">Leaderboard</h3>
            <div className="w-full mt-4 text-gray-600 text-sm">
                {users.map((player, index) => {
                    const isMe = userId === player.id
                    return (
                        <div
                            key={player.id}
                            className={classNames('my-2 flex justify-between', {
                                'font-medium': isMe,
                                'text-gray-700': isMe,
                            })}
                        >
                            <div className="flex">
                                <div className="w-4 text-center text-gray-400">
                                    {index === 0
                                        ? '🥇'
                                        : index === 1
                                        ? '🥈'
                                        : index === 2
                                        ? '🥉'
                                        : `#${index + 1}`}
                                </div>
                                <div className="ml-3">{player.username}</div>
                            </div>
                            <div className="text-gray-600">
                                {player.score} points
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Leaderboard
