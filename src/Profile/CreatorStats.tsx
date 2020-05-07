import * as React from 'react'
import classNames from 'classnames'
import gql from 'graphql-tag'
import { useGetAccountStatsQuery } from '../generated/graphql'
import { Emoji } from 'emoji-mart'
import ReactTooltip from 'react-tooltip'
import pluralize from 'pluralize'
import { track } from '../utils/tracking'

gql`
    query getAccountStats($auth0Id: String!) {
        account(where: { auth0id: $auth0Id }) {
            id
            stats {
                distinctMovieCount
                rengaCount
            }
        }
    }
`

export interface AccountStatsProps {
    className?: string
    auth0Id: string
}

const CreatorLevel = ({
    className,
    movieCount,
}: {
    className?: string
    movieCount: number
}) => {
    let emoji = 'baby'
    let level = 0
    let next = 0

    if (movieCount < 5) {
        emoji = 'baby'
        level = 1
        next = 5
    } else if (movieCount < 15) {
        emoji = 'child'
        level = 2
        next = 15
    } else if (movieCount < 40) {
        emoji = 'mortar_board'
        level = 3
        next = 40
    } else if (movieCount < 100) {
        emoji = 'nerd_face'
        level = 4
        next = 100
    } else if (movieCount < 180) {
        emoji = 'popcorn'
        level = 5
        next = 180
    } else if (movieCount < 300) {
        emoji = 'male_zombie'
        level = 6
        next = 300
    } else {
        emoji = 'man_in_business_suit_levitating'
        level = 7
    }

    return (
        <div
            data-tip={
                next
                    ? `Next level in ${next - movieCount} movies`
                    : 'You reach the maximum level !'
            }
            className={classNames(
                'flex flex-col px-4 items-center space-y-2 cursor-auto',
                className
            )}
        >
            <ReactTooltip
                effect="solid"
                afterShow={() => track('Shown next level')}
            />
            <Emoji emoji={emoji} size={52} />
            <span className="uppercase font-medium text-primary">
                Level {level}
            </span>
        </div>
    )
}

export default ({ className, auth0Id }: AccountStatsProps) => {
    const { data } = useGetAccountStatsQuery({
        variables: { auth0Id },
    })
    if (!data?.account?.stats) return <div></div>
    const { distinctMovieCount, rengaCount } = data.account.stats
    return (
        <div
            className={classNames('bg-white rounded-lg p-4 w-full', className)}
        >
            <div className="flex flex-row justify-between">
                <div className="flex flex-col space-y-2">
                    <div className="text-gray-800 sm:text-3xl text-lg">
                        You made guess{' '}
                        {pluralize('different movie', distinctMovieCount, true)}
                    </div>
                    <div className="text-gray-700 sm:text-base text-sm">
                        over {pluralize('renga', rengaCount, true)}
                    </div>
                </div>
                <CreatorLevel
                    className="flex-shrink-0"
                    movieCount={distinctMovieCount}
                />
            </div>
        </div>
    )
}
