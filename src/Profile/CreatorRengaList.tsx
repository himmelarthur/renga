import classNames from 'classnames'
import { Emoji } from 'emoji-mart'
import gql from 'graphql-tag'
import * as React from 'react'
import {
    useGetAccountRengasQuery,
    QueryRengasOrderByInput,
    OrderByArg,
} from '../generated/graphql'
import Button from '../components/Button'
import { DEFAULT_RENGAS_PAGE_COUNT } from '../client'
import Ordering from '../Party/Rengas/Ordering'
import { track } from '../utils/tracking'

gql`
    query getAccountRengas(
        $auth0Id: String!
        $first: Int!
        $skip: Int!
        $orderBy: QueryRengasOrderByInput!
    ) {
        rengasAccount: rengas(
            orderBy: $orderBy
            first: $first
            skip: $skip
            where: { author: { account: { auth0id: { equals: $auth0Id } } } }
        ) {
            id
            emojis
            attemptCount
            createdAt
            likeCount
            solverCount
            successRatio
            status {
                maybeTitle
            }
            party {
                id
                createdAt
            }
        }
    }
`

export interface MyRengaListProps {
    className?: string
    auth0Id: string
}

export default ({ className, auth0Id }: MyRengaListProps) => {
    const batch = DEFAULT_RENGAS_PAGE_COUNT
    const [orderBy, setOrderBy] = React.useState<QueryRengasOrderByInput>({
        createdAt: OrderByArg.Desc,
    })
    const [page, setPage] = React.useState(1)
    const { data, fetchMore } = useGetAccountRengasQuery({
        variables: { auth0Id, first: batch, skip: 0, orderBy },
    })
    if (!data) return <div></div>
    return (
        <div
            className={classNames(
                'flex flex-col space-y-8 bg-white rounded-lg p-4',
                className
            )}
        >
            <Ordering onSelect={setOrderBy} />
            {data.rengasAccount.map((renga) => {
                return (
                    <div
                        key={renga.id}
                        className={classNames(
                            'flex flex-col sm:flex-row sm:justify-between sm:items-baseline items-center w-full space-y-3',
                            { 'opacity-50': renga.solverCount === 0 }
                        )}
                    >
                        <div className="flex flex-row items-baseline space-x-4 w-full sm:w-3/5">
                            <span className="text-gray-800 font-medium truncate">
                                <a href={`/p/${renga.party.id}#${renga.id}`}>
                                    {renga.status.maybeTitle}
                                </a>
                            </span>
                            <div className="flex flex-row justify-center items-baseline space-x-2 rounded-full px-3 py-2 bg-gray-100">
                                {renga.emojis.map((emoji, index) => (
                                    <div key={index.toString()}>
                                        <Emoji
                                            size={16}
                                            native={false}
                                            emoji={emoji}
                                            key={index}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-gray-600 flex flex-row items-baseline space-x-2 text-sm">
                            <span>
                                🙌 {renga.solverCount}/{renga.attemptCount} (
                                {(renga.successRatio * 100).toFixed(0)}%)
                            </span>
                        </div>
                    </div>
                )
            })}
            <Button
                onClick={() => {
                    track('Clicked More Renga profile')
                    fetchMore({
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev
                            setPage(page + 1)
                            return Object.assign({}, prev, {
                                rengasAccount: [
                                    // @ts-ignore
                                    ...prev.rengasAccount,
                                    // @ts-ignore
                                    ...fetchMoreResult.rengasAccount,
                                ],
                            })
                        },
                        variables: {
                            auth0Id,
                            first: batch,
                            skip: page * batch,
                        },
                    })
                }}
            >
                More
            </Button>
        </div>
    )
}
