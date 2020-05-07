import ConfettiGenerator from 'confetti-js'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Player } from '../PartyContext'
import InviteLink from '../components/InviteLink'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import PlayerStats from '../components/PlayerStats'
import RengaForm from '../components/RengaForm'
import { track } from '../utils/tracking'
import Rengas from './Rengas/Rengas'
import TopBar from '../components/TopBar'

type Props = {
    partyId: string
    user: Player
}

const Party = ({ partyId, user }: Props) => {
    const [confettis, setConfettis] = useState<ConfettiGenerator>()
    const [createRengaOn, setCreateRengaOn] = useState(false)
    const [solvingRenga, setSolvingRenga] = useState<number>()
    const { hash, pathname } = useLocation()
    const history = useHistory()

    useEffect(() => {
        track('View Party Page', {
            partyId,
        })
    }, [partyId])

    const goToHash = (hash?: string) => {
        history.push(pathname + (hash ? `#${hash}` : '#'), null)
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
    }, [partyId])
    return (
        <>
            <canvas
                id="confetti"
                style={{ position: 'fixed', top: 0, zIndex: -1 }}
            ></canvas>
            <div className="sm:p-10 p-4">
                <TopBar className="mb-4" />
                <div className="flex justify-center my-4 sm:my-0">
                    <PlayerStats userId={user.userId} />
                </div>
                <div className="flex sm:flex-row sm:justify-center flex-col sm:px-20 sm:mt-20 sm:items-start">
                    <div className="sm:mx-4 sm:max-w-screen-md sm:w-full">
                        {createRengaOn ? (
                            <RengaForm
                                partyId={partyId}
                                userId={user.userId}
                                onCreated={() => goToHash()}
                                onClose={() => goToHash()}
                            ></RengaForm>
                        ) : (
                            <Rengas
                                showControls
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
                        )}
                    </div>
                    <Leaderboard
                        className="mt-6 sm:mt-0 max-w-md w-full"
                        partyId={partyId}
                        userId={user.userId}
                    ></Leaderboard>
                </div>
            </div>
        </>
    )
}

export default Party
