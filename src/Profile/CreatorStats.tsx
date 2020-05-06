import * as React from 'react'
import classNames from 'classnames'
import gql from 'graphql-tag'
import { useGetAccountStatsQuery } from '../generated/graphql'

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
            <div>
                <div>
                    <div className="text-gray-800 text-3xl">
                        You made guess {distinctMovieCount} different movies
                    </div>
                    <div className="text-gray-700 text-base">
                        {' '}
                        over {rengaCount} rengas{' '}
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}
