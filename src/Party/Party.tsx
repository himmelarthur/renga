import ConfettiGenerator from 'confetti-js'
import { motion } from 'framer-motion'
import React, { useCallback, useState } from 'react'
import InviteLink from '../components/InviteLink'
import Leaderboard from '../components/Leaderboard'
import RengaForm from '../components/RengaForm'
import RengaSubmission from '../components/RengaSubmission'
import Rengas from './Rengas'
import JoinForm from './JoinForm'
import NoRengas from './NoRengas'
import JoinParty from './JoinParty'

type Props = {
    partyId: string
    userId?: number
}

const Party = ({ partyId, userId }: Props) => {
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

    if (!userId) {
        // The user is not logged in
        return <JoinParty partyId={partyId} />
    }

    return (
        <>
            <canvas
                id="confetti"
                style={{ position: 'fixed', top: 0, zIndex: -1 }}
            ></canvas>
            <div className="sm:p-10 p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 justify-between">
                    <h1 className="text-primary font-logo text-3xl">Renga</h1>
                    <div className="hidden sm:block">
                        <InviteLink partyId={partyId} />
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col sm:px-20 sm:mt-20">
                    <div className="sm:w-2/3">
                        <div className="sm:mx-4">
                            {createRengaOn && userId ? (
                                <RengaForm
                                    partyId={partyId}
                                    userId={userId}
                                    onCreated={() => setCreateRengaOn(false)}
                                    onClose={() => setCreateRengaOn(false)}
                                ></RengaForm>
                            ) : (
                                <div className="mt-0">
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
                                                onClose={() =>
                                                    setSolvingRenga(undefined)
                                                }
                                            ></RengaSubmission>
                                        </motion.div>
                                    ) : undefined}
                                    <Rengas
                                        displayNewButton
                                        onClickNew={() => {
                                            confettis?.clear()
                                            setSolvingRenga(undefined)
                                            setCreateRengaOn(true)
                                        }}
                                        highlightedRenga={solvingRenga}
                                        partyId={partyId}
                                        noRengasComponent={<NoRengas />}
                                        onClickRenga={(rengaId) => {
                                            confettis?.clear()
                                            if (rengaId === solvingRenga) {
                                                setSolvingRenga(undefined)
                                            } else {
                                                setSolvingRenga(rengaId)
                                            }
                                        }}
                                    />
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

export default Party
