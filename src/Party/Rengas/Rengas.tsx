import { AnimateSharedLayout } from 'framer-motion'
import React, { useState } from 'react'
import Renga from '../../components/Renga/Renga'
import { track } from '../../utils/tracking'
import { useFetchRengas } from './hooks'

const Rengas = ({
    partyId,
    highlightedRenga,
    noRengasComponent,
    onClickRenga,
    displayNewButton,
    showControls,
    onClickNew,
    onClose,
    onSolvedRenga,
}: Props) => {
    const { data, loading } = useFetchRengas(partyId)

    const [hideMe, setHideMe] = useState(false)
    const [hideResolved, setHideResolved] = useState(false)
    if (loading) {
        return <div></div>
    }
    return (
        <div className="flex flex-col items-center sm:items-start">
            {showControls ? (
                <div className="flex items-end py-2 text-xs font-medium w-64 mr-8">
                    <label className="block text-gray-600">
                        <input
                            className="leading-tight"
                            type="checkbox"
                            onClick={() => {
                                track('Change Hide Resolved', {
                                    hide: !hideResolved,
                                })
                                setHideResolved(!hideResolved)
                            }}
                        />
                        <span className="uppercase ml-2">Hide solved</span>
                    </label>
                    <label className="block text-gray-600 ml-6">
                        <input
                            className="leading-tight"
                            type="checkbox"
                            onClick={() => {
                                track('Change Hide Mine', { hide: !hideMe })
                                setHideMe(!hideMe)
                            }}
                        />
                        <span className="uppercase ml-2">Hide mine</span>
                    </label>
                </div>
            ) : undefined}
            <div className="flex flex-row flex-wrap justify-center sm:justify-start mt-4 max-w-full">
                <AnimateSharedLayout type="switch">
                    {data?.rengas.length ? (
                        <>
                            {displayNewButton ? (
                                <div
                                    className="flex flex-col justify-center items-center sm:w-40 w-32 mr-4 mb-4 rounded hover:bg-gray-200 px-2 py-10 cursor-pointer text-primary font-medium uppercase bg-gray-100"
                                    onClick={onClickNew}
                                >
                                    + New renga
                                </div>
                            ) : undefined}
                            {data.rengas
                                .filter((x) =>
                                    hideMe ? !x.status.isMine : true
                                )
                                .filter((x) => !x.deletedAt)
                                .filter((x) =>
                                    hideResolved ? !x.status.isResolved : true
                                )
                                .map((renga) => (
                                    <Renga
                                        key={renga.id}
                                        renga={renga}
                                        open={highlightedRenga === renga.id}
                                        onClick={() => onClickRenga(renga.id)}
                                        onSolved={() => onSolvedRenga(renga.id)}
                                        onClose={() => onClose()}
                                    />
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
    showControls: boolean
    onClickNew?: () => void
    onClose: () => void
    onSolvedRenga: (rengaId: number) => void
}

export default Rengas
