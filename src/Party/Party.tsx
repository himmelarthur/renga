import ConfettiGenerator from 'confetti-js'
import { motion } from 'framer-motion'
import React, { useCallback, useState } from 'react'
import Leaderboard from '../components/Leaderboard'
import RengaForm from '../components/RengaForm'
import RengaSubmission from '../components/RengaSubmission'
import JoinParty from './JoinParty'
import NoRengas from './NoRengas'
import Rengas from './Rengas'

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
            <div className="sm:flex sm:flex-col items-center sm:px-10 sm:py-4 p-4 mb-20">
                <div className="flex flex-row justify-between items-center sticky top-0 w-full">
                    <div className="flex flex-row items-baseline">
                        <h1 className="flex justify-center items-center text-primary font-logo text-3xl rounded-lg h-12 w-12 m-auto align-middle leading-none border-2 border-pink-500 text-center">
                            R
                        </h1>
                        {/* <InviteLink partyId={partyId} /> */}
                    </div>
                    <button className="h-12 px-3 border border-pink-500 text-pink-500 rounded">
                        New party
                    </button>
                </div>
                <div className="flex sm:flex-row flex-col sm:justify-center max-w-6xl mt-4 w-full">
                    <div className="sm:w-2/3">
                        <div >
                        <h3 className="text-gray-700 text-2xl font-bold">Rengas</h3>
                            {createRengaOn && userId ? (
                                <RengaForm
                                    partyId={partyId}
                                    userId={userId}
                                    onCreated={() => setCreateRengaOn(false)}
                                    onClose={() => setCreateRengaOn(false)}
                                ></RengaForm>
                            ) : (
                                <div className="">
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
                <div className="w-full h-24 fixed bottom-0 bg-gray-100 flex justify-center items-center">
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
        </>
    )
}

export default Party
