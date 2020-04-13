import ConfettiGenerator from 'confetti-js'
import { motion } from 'framer-motion'
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
            <div className="sm:p-10 p-4">
                <div className="flex sm:flex-row flex-col">
                    <div className="sm:w-2/3">
                        <h1 className="text-primary font-logo text-3xl mb-4">
                            Renga
                        </h1>
                        <InviteLink partyId={partyId} />
                        <div>
                            {createRengaOn ? (
                                <RengaForm
                                    partyId={partyId}
                                    userId={userId}
                                    onCreated={() => setCreateRengaOn(false)}
                                ></RengaForm>
                            ) : (
                                <div className="sm:mt-8 mt-0">
                                    <div className="flex justify-center mb-8">
                                        <button
                                            className="w-full sm:w-auto text-white py-2 px-4 rounded text-xl font-medium mt-4 sm:mt-0 hover:opacity-75"
                                            style={{
                                                background:
                                                    'linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%)',
                                            }}
                                            onClick={() => {
                                                confettis?.clear()
                                                setCreateRengaOn(true)
                                            }}
                                        >
                                            New Renga
                                        </button>
                                    </div>
                                    {solvingRenga ? (
                                        <motion.div
                                            className="mb-8"
                                            animate="visible"
                                            initial="hidden"
                                            variants={{
                                                hidden: { opacity: 0, y: -100 },
                                                visible: { opacity: 1, y: 0 },
                                            }}
                                        >
                                            <RengaSubmission
                                                rengaId={solvingRenga}
                                                userId={userId}
                                                onSolved={onSolvedRenga}
                                                partyId={partyId}
                                            ></RengaSubmission>
                                        </motion.div>
                                    ) : undefined}
                                    <motion.div>
                                        <Rengas
                                            highlightedRenga={solvingRenga}
                                            partyId={partyId}
                                            onClickRenga={(rengaId) => {
                                                confettis?.clear()
                                                if (rengaId === solvingRenga) {
                                                    setSolvingRenga(undefined)
                                                } else {
                                                    setSolvingRenga(rengaId)
                                                }
                                            }}
                                        />
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="sm:w-1/3">
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

export default AuthParty
