import * as React from 'react'
import classNames from 'classnames'
import gql from 'graphql-tag'
import { useLikeRengaMutation } from '../../generated/graphql'
import Loader from 'react-loader-spinner'
import Button from '../Button'
import { motion } from 'framer-motion'

export interface LikeProps {
    className?: string
    userId: number
    rengaId: number
    isLiked: boolean
}

gql`
    mutation likeRenga($rengaId: Int!) {
        likeRenga(rengaId: $rengaId) {
            id
            likeCount
            status {
                isLiked
            }
        }
    }
`

export default ({ rengaId }: LikeProps) => {
    const [likeRenga, { loading, data }] = useLikeRengaMutation({
        variables: { rengaId },
    })
    if (loading)
        return (
            <Loader
                color="#ff7eb2"
                type="TailSpin"
                height={24}
                width={24}
            ></Loader>
        )
    if (!data?.likeRenga.id)
        return (
            <motion.div
                className="max-w-full flex justify-center justify-center text-center items-center flex-col sm:flex-row"
                variants={{
                    hidden: { opacity: 0, y: -40 },
                    visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
                }}
                initial="hidden"
                animate="visible"
            >
                <div className="text-gray-700 text-sm font-medium">
                    Let the author know you liked it:
                </div>
                <button
                    onClick={() => likeRenga()}
                    className="sm:ml-2 sm:mt-0 mt-2 border border-primary py-1 px-2 text-primary rounded text-sm transition hover:border-transparent hover:bg-primary hover:text-white"
                >
                    Loved this Renga! <span>❤️</span>
                </button>
            </motion.div>
        )
    return <div className="text-gray-700 text-sm font-medium">Thanks ! ❤️</div>
}
