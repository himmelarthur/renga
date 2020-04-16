import React, { useState, useLayoutEffect } from 'react'
import gql from 'graphql-tag'
import { useGetRengasQuery } from '../generated/graphql'
import Renga from '../components/Renga'
import { motion, AnimateSharedLayout, useAnimation } from 'framer-motion'

gql`
    query GetRengas($partyId: String!) {
        rengas(
            where: { partyId: { equals: $partyId } }
            orderBy: { createdAt: desc }
        ) {
            id
            emojis
            author {
                id
                username
            }
            createdAt
            status {
                isResolved
                isMine
            }
        }
    }
`

const Rengas = ({
    partyId,
    highlightedRenga,
    noRengasComponent,
    onClickRenga,
    displayNewButton,
    onClickNew,
}: Props) => {
    const { data, loading } = useGetRengasQuery({
        variables: { partyId },
        pollInterval: Number(process.env.REACT_APP_POLL_INTERVAL) || undefined,
        onCompleted: (data) => setRengaIds(data.rengas.map(({ id }) => id)),
    })
    const [rengaIds, setRengaIds] = useState<number[]>()
    const newRengasAnimationControl = useAnimation()

    useLayoutEffect(() => {
        const newRengaIds = data?.rengas
            .filter(({ id }) => !rengaIds?.includes(id))
            .map(({ id }) => id)
        if (rengaIds?.length && newRengaIds?.length) {
            newRengasAnimationControl.start((rengaId) =>
                newRengaIds.includes(rengaId)
                    ? {
                          scale: [1, 1.3, 1],
                          transition: { delay: 1, duration: 0.5 },
                      }
                    : {}
            )
            setRengaIds(data?.rengas.map(({ id }) => id))
        }
    }, [data, newRengasAnimationControl, rengaIds])
    if (loading) {
        return <div></div>
    }
    return (
        <div className="flex flex-row flex-wrap justify-center sm:justify-start">
            <AnimateSharedLayout type="switch">
                {data?.rengas.length ? (
                    <>
                        {displayNewButton ? (
                            <div
                                className="flex flex-col justify-center items-center sm:w-40 h-24 w-32 mr-4 mb-4 rounded hover:bg-gray-200 p-2 cursor-pointer text-primary font-medium uppercase bg-gray-100"
                                onClick={onClickNew}
                            >
                                + New renga
                            </div>
                        ) : undefined}
                        {data.rengas.map((renga) => (
                            <motion.div
                                key={renga.id}
                                layoutId={renga.id.toString()}
                                custom={renga.id}
                                animate={newRengasAnimationControl}
                            >
                                <Renga
                                    key={renga.id}
                                    renga={renga}
                                    highlighted={highlightedRenga === renga.id}
                                    onClick={() => onClickRenga(renga.id)}
                                />
                            </motion.div>
                        ))}
                    </>
                ) : (
                    noRengasComponent
                )}
            </AnimateSharedLayout>
        </div>
    )
}

type Props = {
    partyId: string
    onClickRenga: (rengaId: number) => void
    noRengasComponent?: JSX.Element
    highlightedRenga?: number
    displayNewButton?: boolean
    onClickNew?: () => void
}

export default Rengas
