import ConfettiGenerator from 'confetti-js'
import React, { useCallback, useState, useEffect } from 'react'
import InviteLink from '../components/InviteLink'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import RengaForm from '../components/RengaForm'
import NoRengas from './NoRengas'
import { useLocation, useHistory } from 'react-router-dom'
import Rengas from './Rengas/Rengas'
import { track } from '../utils/tracking'

type Props = {
    partyId: string
    userId: number
}

const Party = ({ partyId, userId }: Props) => {
    const [confettis, setConfettis] = useState<ConfettiGenerator>()
    const [createRengaOn, setCreateRengaOn] = useState(false)
    const [solvingRenga, setSolvingRenga] = useState<number>()
    const { hash, pathname } = useLocation()
    const history = useHistory()

    useEffect(() => {
        track('View Party Page', {
            partyId,
        })
    }, [])

    const goToHash = (hash?: string) => {
        history.push(pathname + hash ? `#${hash}` : '', null)
    }

    useEffect(() => {
        switch (hash) {
            case '#':
                setCreateRengaOn(false)
                setSolvingRenga(undefined)
                return
            case '#new':
                setCreateRengaOn(true)
                setSolvingRenga(undefined)
                return
            default:
                setCreateRengaOn(false)
                try {
                    const selectedRengaId = Number(hash.replace('#', ''))
                    setSolvingRenga(selectedRengaId)
                } catch (err) {}
                return
        }
    }, [hash])

    const onSolvedRenga = useCallback(() => {
        track('Solved Renga', {
            partyId,
        })
        const confetti = new ConfettiGenerator({
            target: 'confetti',
            max: '200',
            size: '1',
            animate: true,
            props: ['square'],
            colors: [
                [165, 104, 246],
                [230, 61, 135],
                [0, 199, 228],
                [253, 214, 126],
            ],
            clock: '25',
            rotate: true,
        })
        confetti.render()
        setConfettis(confetti)
        return () => confetti.clear()
    }, [])
    return (
        <>
            <canvas
                id="confetti"
                style={{ position: 'fixed', top: 0, zIndex: -1 }}
            ></canvas>
            <div className="sm:p-10 p-4">
                <div className="flex flex-row items-start items-center mb-4 justify-between">
                    <h1 className="text-primary font-logo text-3xl">Renga</h1>
                    <div className="flex flex-row items-baseline">
                        <InviteLink
                            className="hidden sm:flex mr-4"
                            partyId={partyId}
                        />
                        <a
                            href="/"
                            target="_blank"
                            className="border border-primary py-2 px-4 text-primary rounded"
                        >
                            Start new party
                        </a>
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col sm:px-20 sm:mt-20">
                    <div className="sm:w-2/3">
                        <div className="sm:mx-4">
                            {createRengaOn && userId ? (
                                <RengaForm
                                    partyId={partyId}
                                    userId={userId}
                                    onCreated={() => goToHash()}
                                    onClose={() => goToHash()}
                                ></RengaForm>
                            ) : (
                                <div className="mt-0">
                                    <Rengas
                                        displayNewButton
                                        onClose={() => {
                                            track('Closed Open Renga', {
                                                partyId,
                                            })
                                            confettis?.clear()
                                            goToHash('')
                                        }}
                                        onSolvedRenga={onSolvedRenga}
                                        onClickNew={() => {
                                            track('Clicked New Renga', {
                                                partyId,
                                            })
                                            confettis?.clear()
                                            goToHash('new')
                                        }}
                                        highlightedRenga={solvingRenga}
                                        partyId={partyId}
                                        noRengasComponent={
                                            <NoRengas
                                                onClickNew={() =>
                                                    goToHash('new')
                                                }
                                            />
                                        }
                                        onClickRenga={(rengaId) => {
                                            track('Clicked Renga', {
                                                partyId,
                                                rengaId,
                                            })
                                            confettis?.clear()
                                            if (rengaId === solvingRenga) {
                                                goToHash()
                                            } else {
                                                goToHash(rengaId.toString())
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="sm:w-1/3 mt-6 sm:mt-0 max-w-md">
                        <Leaderboard
                            partyId={partyId}
                            userId={userId}
                        ></Leaderboard>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Party
