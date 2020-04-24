import * as React from 'react'
import classNames from 'classnames'
import gql from 'graphql-tag'
import {
    useUseHintMutation,
    GetUserDocument,
    GetRengaDocument,
} from '../../generated/graphql'

gql`
    mutation useHint($rengaId: Int!, $type: String!) {
        useHint(rengaId: $rengaId, type: $type)
    }
`

export const useHint = (userId: number, rengaId: number) => {
    const [useHint] = useUseHintMutation({
        onCompleted: (data) => {
            if (!data.useHint) alert('No hint left')
        },
        refetchQueries: [
            { query: GetUserDocument, variables: { userId } },
            { query: GetRengaDocument, variables: { rengaId } },
        ],
    })
    return [useHint]
}

export interface HintsProps {
    className?: string
    rengaId: number
    userId: number
    year?: number | null
    genres?: string[] | null
}

export default ({ className, year, genres, rengaId, userId }: HintsProps) => {
    const [spendHint] = useHint(userId, rengaId)
    return (
        <div
            className={classNames(
                className,
                'flex flex-col space-y-2 justify-between text-sm text-gray-600'
            )}
        >
            <div className="space-x-2">
                <span>📅Release date</span>
                {year ? (
                    <span className="font-semibold text-gray-700">{year}</span>
                ) : (
                    <button
                        onClick={() =>
                            spendHint({ variables: { rengaId, type: 'YEAR' } })
                        }
                        className="font-semibold uppercase rounded text-primary focus:outline-none"
                    >
                        See for 1 💡
                    </button>
                )}
            </div>
            <div className="space-x-2">
                <span>🎫Genres</span>
                {genres ? (
                    <span className="font-semibold text-gray-700">
                        {genres.join(', ')}
                    </span>
                ) : (
                    <button
                        onClick={() =>
                            spendHint({
                                variables: { rengaId, type: 'GENRES' },
                            })
                        }
                        className="font-semibold uppercase rounded text-primary focus:outline-none"
                    >
                        See for 1 💡
                    </button>
                )}
            </div>
        </div>
    )
}
