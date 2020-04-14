import React from 'react'
import { motion } from 'framer-motion'
import JoinForm from './JoinForm'
import Rengas from './Rengas'
import NoRengas from './NoRengas'
import Leaderboard from '../components/Leaderboard'

type Props = {
    partyId: string
}

const JoinParty = ({ partyId }: Props) => {
    return (
        <>
            <canvas
                id="confetti"
                style={{ position: 'fixed', top: 0, zIndex: -1 }}
            ></canvas>
            <div className="sm:p-10 p-4">
                <h1 className="text-primary font-logo text-3xl mb-4">Renga</h1>
                <div className="flex sm:flex-row flex-col">
                    <div className="sm:w-2/3">
                        <div>
                            <div className="sm:mt-8 mt-0">
                                <motion.div
                                    animate="visible"
                                    initial="hidden"
                                    className="flex mb-8 items-start justify-start flex-col"
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            y: -50,
                                        },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                delay: 0.5,
                                            },
                                        },
                                    }}
                                >
                                    <JoinForm partyId={partyId}></JoinForm>
                                </motion.div>

                                <div className="pointer-events-none">
                                    <Rengas
                                        partyId={partyId}
                                        noRengasComponent={<NoRengas />}
                                        onClickRenga={() => {}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:w-1/3">
                        <Leaderboard partyId={partyId}></Leaderboard>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JoinParty
