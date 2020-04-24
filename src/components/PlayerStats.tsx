import * as React from 'react'
import classNames from 'classnames'
import gql from 'graphql-tag'
import { useGetUserQuery } from '../generated/graphql'

gql`
    query getUser($userId: Int!) {
        user(where: { id: $userId }) {
            id
            postedCount
            solvedCount
            usedHintCount
        }
    }
`

export interface PlayerStatsProps {
    className?: string
    userId: number
}

export default ({ className, userId }: PlayerStatsProps) => {
    const { data } = useGetUserQuery({ variables: { userId } })
    return (
        <div
            className={classNames(
                className,
                'flex flex-none flex-row space-x-2 px-4 py-2 bg-gray-100 rounded-full'
            )}
        >
            <div className="flex flex-row items-baseline">
                <span className="font-medium text-sm text-gray-800">
                    🎬{data?.user?.postedCount ?? 0}
                </span>
                <span className="ml-1 uppercase text-gray-600 text-xs">
                    created
                </span>
            </div>
            <div className="flex flex-row items-baseline">
                <span className="font-medium text-sm text-gray-800">
                    🔍{data?.user?.solvedCount ?? 0}
                </span>
                <span className="ml-1 uppercase text-gray-600 text-xs">
                    solved
                </span>
            </div>
            <div className="flex flex-row items-baseline">
                <span className="font-medium text-sm text-gray-800">
                    💡
                    {(data?.user?.postedCount ?? 0) -
                        (data?.user?.usedHintCount ?? 0)}
                </span>
                <span className="ml-1 uppercase text-gray-600 text-xs">
                    hints
                </span>
            </div>
        </div>
    )
}
