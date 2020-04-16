import React from 'react'
import Renga from '../../components/Renga'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { useFetchRengas } from './hooks'

const Rengas = ({
    partyId,
    highlightedRenga,
    noRengasComponent,
    onClickRenga,
    displayNewButton,
    onClickNew,
}: Props) => {
    const { animationControl, fetchState } = useFetchRengas(partyId)

    if (fetchState.loading) {
        return <div></div>
    }
    return (
        <div className="flex flex-row flex-wrap justify-center sm:justify-start">
            <AnimateSharedLayout type="switch">
                {fetchState.data?.rengas.length ? (
                    <>
                        {displayNewButton ? (
                            <div
                                className="flex flex-col justify-center items-center sm:w-40 h-24 w-32 mr-4 mb-4 rounded hover:bg-gray-200 p-2 cursor-pointer text-primary font-medium uppercase bg-gray-100"
                                onClick={onClickNew}
                            >
                                + New renga
                            </div>
                        ) : undefined}
                        {fetchState.data.rengas.map((renga) => (
                            <motion.div
                                key={renga.id}
                                layoutId={renga.id.toString()}
                                custom={renga.id}
                                animate={animationControl}
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
