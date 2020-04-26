import { AnimateSharedLayout } from 'framer-motion'
import React, { useState } from 'react'
import Renga from '../../components/Renga/Renga'
import { track } from '../../utils/tracking'
import { useFetchRengas } from './hooks'
import { NetworkStatus } from 'apollo-boost'
import ScrollAwareContainer from '../../components/ScrollAwareContainer'
import Loader from 'react-loader-spinner'

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
    const { data, networkStatus, fetchMore, page } = useFetchRengas(partyId)

    const [hideMe, setHideMe] = useState(false)
    const [hideResolved, setHideResolved] = useState(false)
    if (networkStatus === NetworkStatus.loading || !data) return <div></div>
    return (
        <div>
            <ScrollAwareContainer
                className="flex flex-col items-center sm:items-start"
                scrollKey={page.toString()}
                onScrollPast={fetchMore}
            >
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
                        {data.rengas.length ? (
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
                                    .filter((x) => {
                                        if (highlightedRenga === x.id)
                                            return true
                                        if (hideMe && x.status.isMine)
                                            return false
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
                                            onClick={() =>
                                                onClickRenga(renga.id)
                                            }
                                            onSolved={() =>
                                                onSolvedRenga(renga.id)
                                            }
                                            onClose={() => onClose()}
                                        />
                                    ))}
                            </>
                        ) : (
                            noRengasComponent
                        )}
                    </AnimateSharedLayout>
                </div>
            </ScrollAwareContainer>
            <div className="flex items-center justify-center">
                {networkStatus === NetworkStatus.fetchMore ? (
                    <Loader
                        color="#ff7eb2"
                        type="TailSpin"
                        height={42}
                        width={42}
                    ></Loader>
                ) : undefined}
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
