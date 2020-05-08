import { motion } from 'framer-motion'
import React from 'react'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import JoinForm from './JoinForm'
import Rengas from './Rengas/Rengas'
import TopBar from '../components/TopBar'

type Props = {
    partyId: string
}

const JoinParty = ({ partyId }: Props) => {
    return (
        <div className="sm:p-10 p-4">
            <TopBar className="mb-4" partyId={partyId} />
            <div className="flex sm:flex-row flex-col sm:px-20 sm:mt-20">
                <div className="sm:w-2/3">
                    <div className="sm:mx-4">
                        <div className="mt-0">
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
                                    showControls={false}
                                    partyId={partyId}
                                    onClickRenga={() => {}}
                                    onClose={() => {}}
                                    onSolvedRenga={() => {}}
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
    )
}

export default JoinParty
