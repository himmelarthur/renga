import * as React from 'react'
import gql from 'graphql-tag'
import { useGetPlayersQuery } from '../../generated/graphql'
import classNames from 'classnames'

interface ILeaderboardProps {
    partyId: string
    userId: number
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
    const { data } = useGetPlayersQuery({ variables: { partyId } })
    if (!data?.party) return <div>Loading...</div>
    const {
        party: { users },
    } = data

    return (
        <div
            className={classNames(
                className,
                'max-w-md p-4 flex flex-col items-center'
            )}
        >
            <h3 className="uppercase font-bold text-gray-900">Leaderboard</h3>
            <div className="w-full mt-4 text-gray-700">
                {users.map((player, index) => {
                    const isMe = userId === player.id
                    return (
                        <div
                            key={player.id}
                            className={classNames('mb-1 flex justify-between', {
                                'font-semibold': isMe,
                            })}
                        >
                            <div className="flex">
                                <div className="w-4 text-center">
                                    {index === 0
                                        ? '🥇'
                                        : index === 1
                                        ? '🥈'
                                        : index === 2
                                        ? '🥉'
                                        : index + 1}
                                </div>
                                <div className="ml-3">{player.username}</div>
                            </div>
                            <div className="">{player.score} points</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Leaderboard
