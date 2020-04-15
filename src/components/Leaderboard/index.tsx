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
        pollInterval: Number(process.env.REACT_APP_POLL_INTERVAL) || undefined,
    })
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
            <h3 className="text-gray-700 text-2xl font-bold">Leaderboard</h3>
            <div className="w-full text-gray-600 text-sm">
                {users.map((player, index) => {
                    const isMe = userId === player.id
                    return (
                        <div
                            key={player.id}
                            className={classNames('my-3 flex justify-between', {
                                'font-medium': isMe,
                                'text-gray-700': isMe,
                            })}
                        >
                            <div className="flex">
                                <div className="w-4 text-center text-gray-400">
                                    {index === 0 ? '🏅' : `#${index + 1}`}
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
