import React, { useContext, useState, useCallback } from 'react'
import Rengas from './Rengas'
import { useParams, Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import RengaForm from '../components/RengaForm'
import RengaSubmission from '../components/RengaSubmission'
import ConfettiGenerator from 'confetti-js'
import Leaderboard from '../components/Leaderboard'

const Party = () => {
    const { partyId } = useParams()
    const { userId } = useContext(AuthContext)
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

    if (!partyId || !userId) return <Redirect to="/"></Redirect>
    return (
        <>
            <canvas
                id="confetti"
                style={{ position: 'fixed', top: 0 }}
            ></canvas>
            <div className="m-20">
                <h1 className="text-4xl mb-4">Renga</h1>
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

export default Party
