import React, { useState } from 'react'
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
    const { animationControl, data, loading } = useFetchRengas(partyId)

    const [hideMe, setHideMe] = useState(false)
    const [hideResolved, setHideResolved] = useState(false)
    if (loading) {
        return <div></div>
    }
    return (
        <div className="flex flex-col py-4">
            <div className="flex items-end h-10 px-6 text-sm">
                <label className="block text-gray-600">
                    <input
                        className="leading-tight"
                        type="checkbox"
                        onClick={() => setHideResolved(!hideResolved)}
                    />
                    <span className="uppercase ml-2">Hide solved</span>
                </label>
                <label className="block text-gray-600 ml-6">
                    <input
                        className="leading-tight"
                        type="checkbox"
                        onClick={() => setHideMe(!hideMe)}
                    />
                    <span className="uppercase ml-2">Hide mine</span>
                </label>
            </div>
            <div className="flex flex-row flex-wrap justify-center sm:justify-start mt-4">
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
                            {data.rengas
                                .filter((x) =>
                                    hideMe ? !x.status.isMine : true
                                )
                                .filter((x) =>
                                    hideResolved ? !x.status.isResolved : true
                                )
                                .map((renga) => (
                                    <motion.div
                                        key={renga.id}
                                        layoutId={renga.id.toString()}
                                        custom={renga.id}
                                        animate={animationControl}
                                    >
                                        <Renga
                                            key={renga.id}
                                            renga={renga}
                                            highlighted={
                                                highlightedRenga === renga.id
                                            }
                                            onClick={() =>
                                                onClickRenga(renga.id)
                                            }
                                        />
                                    </motion.div>
                                ))}
                        </>
                    ) : (
                        noRengasComponent
                    )}
                </AnimateSharedLayout>
            </div>
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
