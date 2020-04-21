import React from 'react'
import { motion } from 'framer-motion'
import JoinForm from './JoinForm'
import Rengas from './Rengas/Rengas'
import NoRengas from './NoRengas'
import Leaderboard from '../components/Leaderboard/Leaderboard'

type Props = {
    partyId: string
}

const JoinParty = ({ partyId }: Props) => {
    return (
        <div className="sm:p-10 p-4">
            <div className="flex items-center  mb-4 justify-between">
                <h1 className="text-primary font-logo text-3xl">Renga</h1>
                <a
                    href="/"
                    target="_blank"
                    className="border border-primary py-2 px-4 text-primary rounded"
                >
                    Start new party
                </a>
            </div>
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
                                    noRengasComponent={
                                        <NoRengas onClickNew={() => {}} />
                                    }
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
