import ConfettiGenerator from 'confetti-js'
import React, { useCallback, useState } from 'react'
import InviteLink from '../components/InviteLink'
import Leaderboard from '../components/Leaderboard'
import RengaForm from '../components/RengaForm'
import RengaSubmission from '../components/RengaSubmission'
import Rengas from './Rengas'

type Props = {
    partyId: string
    userId: number
}

const AuthParty = ({ partyId, userId }: Props) => {
    const [confettis, setConfettis] = useState<ConfettiGenerator>()
    const [createRengaOn, setCreateRengaOn] = useState(false)
    const [solvingRenga, setSolvingRenga] = useState<number>()

    const onSolvedRenga = useCallback(() => {
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
            <div className="p-10">
                <h1 className="text-primary font-logo text-3xl mb-4">Renga</h1>
                <InviteLink partyId={partyId} />
                <Leaderboard partyId={partyId} userId={userId}></Leaderboard>
                {createRengaOn ? (
                    <RengaForm
                        partyId={partyId}
                        userId={userId}
                        onCreated={() => setCreateRengaOn(false)}
                    ></RengaForm>
                ) : (
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
                            onClick={() => {
                                confettis?.clear()
                                setCreateRengaOn(true)
                            }}
                        >
                            New Renga
                        </button>
                        <Rengas
                            partyId={partyId}
                            onClickRenga={(rengaId) => {
                                confettis?.clear()
                                setSolvingRenga(rengaId)
                            }}
                        />
                    </div>
                )}
                {solvingRenga ? (
                    <RengaSubmission
                        rengaId={solvingRenga}
                        userId={userId}
                        onSolved={onSolvedRenga}
                        partyId={partyId}
                    ></RengaSubmission>
                ) : undefined}
            </div>
        </>
    )
}

export default AuthParty
