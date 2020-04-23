import * as React from 'react'
import classNames from 'classnames'
import gql from 'graphql-tag'
import { useLikeRengaMutation } from '../../generated/graphql'
import Loader from 'react-loader-spinner'

export interface LikeProps {
    className?: string
    userId: number
    rengaId: number
    isLiked: boolean
}

gql`
    mutation likeRenga($like: Boolean!, $rengaId: Int!) {
        likeRenga(liked: $like, rengaId: $rengaId) {
            id
            likeCount
            status {
                isLiked
            }
        }
    }
`

export default ({ className, userId, rengaId, isLiked }: LikeProps) => {
    const [likeRenga, { loading }] = useLikeRengaMutation()
    return (
        <button
            onClick={() =>
                likeRenga({ variables: { rengaId, like: !isLiked } })
            }
            className={classNames(
                className,
                'px-4 py-2 flex justify-center rounded bg-white outline-none focus:outline-none border-2 transition-all duration-200',
                {
                    'text-gray-600 border-transparent': !isLiked,
                    'text-primary font-semibold border-primary': isLiked,
                }
            )}
        >
            {loading ? (
                <Loader
                    color="#ff7eb2"
                    type="TailSpin"
                    height={24}
                    width={24}
                ></Loader>
            ) : (
                '❤ Awesome! I like it'
            )}
        </button>
    )
}
