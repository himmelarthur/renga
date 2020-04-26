import * as React from 'react'
import classNames from 'classnames'
import gql from 'graphql-tag'
import { useGetUserQuery } from '../generated/graphql'
import ReactTooltip from 'react-tooltip'
import { track } from '../utils/tracking'

gql`
    query getUser($userId: Int!) {
        user(where: { id: $userId }) {
            id
            postedCount
            solvedCount
            hintCount
            likedRengaCount
        }
    }
`

export interface PlayerStatsProps {
    className?: string
    userId: number
}

export default ({ className, userId }: PlayerStatsProps) => {
    const { data } = useGetUserQuery({
        pollInterval: Number(process.env.REACT_APP_POLL_INTERVAL) || undefined,
        variables: { userId },
    })
    return (
        <div
            data-tip="You get 💡when one of your Rengas is solved"
            className={classNames(
                className,
                'flex flex-none flex-row space-x-2 px-4 py-2 bg-gray-100 rounded-full cursor-default'
            )}
        >
            <ReactTooltip
                effect="solid"
                afterShow={() => track('Shown hint tooltip')}
            />
            <div className="flex flex-row items-baseline">
                <span className="font-medium text-sm text-gray-800">
                    🎬{data?.user?.postedCount ?? '•'}
                </span>
                <span className="ml-1 uppercase text-gray-600 text-xs">
                    created
                </span>
            </div>
            <div className="flex flex-row items-baseline">
                <span className="font-medium text-sm text-gray-800">
                    🔍{data?.user?.solvedCount ?? '•'}
                </span>
                <span className="ml-1 uppercase text-gray-600 text-xs">
                    solved
                </span>
            </div>
            <div className="flex flex-row items-baseline">
                <span className="font-medium text-sm text-gray-800">
                    💡
                    {data?.user?.hintCount ?? '•'}
                </span>
                <span className="ml-1 uppercase text-gray-600 text-xs">
                    hints
                </span>
            </div>
            <div className="flex flex-row items-baseline">
                <span className="font-medium text-sm text-gray-800">
                    ❤️
                    {data?.user?.likedRengaCount ?? '•'}
                </span>
                <span className="ml-1 uppercase text-gray-600 text-xs">
                    likes
                </span>
            </div>
        </div>
    )
}
