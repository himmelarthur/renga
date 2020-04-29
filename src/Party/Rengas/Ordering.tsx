import * as React from 'react'
import classNames from 'classnames'
import { QueryRengasOrderByInput, OrderByArg } from '../../generated/graphql'

export interface OrderingProps {
    className?: string
    onSelect: (ordering: QueryRengasOrderByInput) => void
}

type Ordering = 'newest' | 'oldest' | 'least_solved' | 'most_solved'

export default ({ className, onSelect }: OrderingProps) => {
    const [ordering, setOrdering] = React.useState<Ordering>('newest')

    const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const orderingValue = event.currentTarget.value as Ordering

        switch (orderingValue) {
            case 'newest':
                onSelect({ createdAt: OrderByArg.Desc })
                break
            case 'oldest':
                onSelect({ createdAt: OrderByArg.Asc })
                break
            case 'least_solved':
                onSelect({ solverCount: OrderByArg.Asc })
                break
            case 'most_solved':
                onSelect({ solverCount: OrderByArg.Desc })
                break
            default:
        }
        setOrdering(orderingValue)
    }

    return (
        <div
            className={classNames(
                'flex flex-none flex-row relative text-gray-600 text-xs items-baseline space-x-2',
                className
            )}
        >
            <span className="flex-shrink-0 font-normal">Sort by</span>
            <select
                onChange={handleChange}
                value={ordering}
                className="block appearance-none text-xs w-32 font-medium uppercase w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="least_solved">Least solved</option>
                <option value="most_solved">Most solved</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </div>
    )
}
