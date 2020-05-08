import { AnimateSharedLayout } from 'framer-motion'
import React, { useState } from 'react'
import Loader from 'react-loader-spinner'
import { DEFAULT_RENGAS_PAGE_COUNT } from '../../client'
import Button from '../../components/Button'
import Renga from '../../components/Renga/Renga'
import { track } from '../../utils/tracking'
import { useFetchRengas } from './hooks'
import Ordering from './Ordering'

const Rengas = ({
    partyId,
    highlightedRenga,
    onClickRenga,
    displayNewButton,
    showControls,
    onClickNew,
    onClose,
    onSolvedRenga,
}: Props) => {
    const {
        data,
        isFetchingMore,
        fetchMoreRengas,
        setOrderBy,
    } = useFetchRengas(partyId, DEFAULT_RENGAS_PAGE_COUNT)

    const [hideMe, setHideMe] = useState(false)
    const [hideResolved, setHideResolved] = useState(false)
    if (!data) return <div></div>
    return (
        <div className="flex flex-col items-center sm:items-start">
            {showControls ? (
                <div className="flex flex-col items-start space-y-2 sm:flex-row sm:space-x-4 mr-20 sm:items-baseline">
                    <div className="flex flex-none items-baseline py-2 text-xs font-medium space-x-4">
                        <label className="block text-gray-600 hover:text-gray-700 cursor-pointer">
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
                        <label className="block text-gray-600 hover:text-gray-700 cursor-pointer">
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
                    <Ordering onSelect={setOrderBy} />
                </div>
            ) : undefined}
            <div className="flex flex-row flex-wrap justify-center sm:justify-start mt-4 max-w-full">
                <AnimateSharedLayout type="switch">
                    {displayNewButton ? (
                        <div
                            className="flex flex-col justify-center items-center sm:w-40 w-32 mr-4 mb-4 rounded hover:bg-gray-200 px-2 py-10 cursor-pointer text-primary font-medium uppercase bg-gray-100"
                            onClick={onClickNew}
                        >
                            + New renga
                        </div>
                    ) : undefined}
                    {data.rengas
                        .filter((x) => {
                            if (highlightedRenga === x.id) return true
                            if (hideMe && x.status.isMine) return false
                            if (hideResolved && x.status.isResolved)
                                return false
                            return true
                        })
                        .filter((x) => !x.deletedAt)
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
                </AnimateSharedLayout>
            </div>
            {data.rengas.length >= DEFAULT_RENGAS_PAGE_COUNT && (
                <div className="w-full flex justify-center">
                    <div className="w-56 flex items-center justify-center">
                        {isFetchingMore ? (
                            <Loader
                                color="#ff7eb2"
                                type="TailSpin"
                                height={42}
                                width={42}
                            ></Loader>
                        ) : (
                            <Button className="w-4" onClick={fetchMoreRengas}>
                                More Rengas
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

type Props = {
    partyId: string
    onClickRenga: (rengaId: number) => void
    highlightedRenga?: number
    displayNewButton?: boolean
    showControls: boolean
    onClickNew?: () => void
    onClose: () => void
    onSolvedRenga: (rengaId: number) => void
}

export default Rengas
