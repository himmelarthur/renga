import { motion } from 'framer-motion'
import gql from 'graphql-tag'
import * as React from 'react'
import Loader from 'react-loader-spinner'
import { useLikeRengaMutation } from '../../generated/graphql'
import { track } from '../../utils/tracking'

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
    const onLikeRenga = React.useCallback(() => {
        track('Liked Renga', {
            rengaId,
        })
        likeRenga()
    }, [likeRenga, rengaId])
    if (loading)
        return (
            <div className="flex justify-center w-full">
                <Loader
                    color="#ff7eb2"
                    type="TailSpin"
                    height={24}
                    width={24}
                ></Loader>
            </div>
        )
    if (!data?.likeRenga.id)
        return (
            <motion.div
                className="w-full flex justify-center justify-center text-center items-center flex-col sm:flex-row"
                variants={{
                    hidden: { opacity: 0, y: -40 },
                    visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
                }}
                initial="hidden"
                animate="visible"
            >
                <div className="text-gray-700 text-sm font-medium my-2">
                    Let us know if you liked it:
                </div>
                <button
                    onClick={onLikeRenga}
                    className="sm:ml-2 sm:mt-0 mt-2 border border-primary py-1 px-2 text-primary rounded text-sm transition hover:border-transparent hover:bg-primary hover:text-white"
                >
                    Loved this Renga! <span>❤️</span>
                </button>
            </motion.div>
        )
    return (
        <div className="text-gray-700 text-sm font-medium px-4 sm:px-6 py-2 w-full text-center">
            Thanks ! ❤️
        </div>
    )
}
