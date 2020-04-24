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

export interface HintsProps {
    className?: string
    rengaId: number
    userId: number
    year?: number | null
    genres?: string[] | null
}

export default ({ className, year, genres, rengaId, userId }: HintsProps) => {
    const [useHint] = useUseHintMutation({
        onCompleted: (data) => {
            if (!data.useHint) alert('No hint left')
        },
        refetchQueries: [
            { query: GetUserDocument, variables: { userId } },
            { query: GetRengaDocument, variables: { rengaId } },
        ],
    })
    return (
        <div
            className={classNames(
                className,
                'flex flex-col space-y-2 justify-between text-sm text-gray-700'
            )}
        >
            <div className="space-x-1">
                <span>📅</span>
                <span>Release date</span>
                {year ? (
                    <span className="font-semibold">{year}</span>
                ) : (
                    <button
                        onClick={() =>
                            useHint({ variables: { rengaId, type: 'YEAR' } })
                        }
                        className="px-4 py-2 focus:outline-none bg-primary rounded text-white"
                    >
                        See for 1 💡
                    </button>
                )}
            </div>
            <div className="space-x-1">
                <span>🎫</span>
                <span>Genres</span>
                {genres ? (
                    <span className="font-semibold">{genres.join(', ')}</span>
                ) : (
                    <button
                        onClick={() =>
                            useHint({ variables: { rengaId, type: 'GENRES' } })
                        }
                        className="px-4 py-2 focus:outline-none bg-primary rounded text-white"
                    >
                        See for 1 💡
                    </button>
                )}
            </div>
        </div>
    )
}
