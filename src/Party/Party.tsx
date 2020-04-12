import React, { useContext, useState, useCallback } from 'react'
import Rengas from './Rengas'
import { useParams, Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import RengaForm from '../components/RengaForm'
import RengaSubmission from '../components/RengaSubmission'

const Party = () => {
    const { partyId } = useParams()
    const { userId } = useContext(AuthContext)
    const [createRengaOn, setCreateRengaOn] = useState(false)
    const [solvingRenga, setSolvingRenga] = useState<number>()
    if (!partyId || !userId) return <Redirect to="/"></Redirect>
    return (
        <div className="m-20">
            <h1 className="text-4xl mb-4">Renga</h1>
            {solvingRenga ? (
                <RengaSubmission
                    rengaId={solvingRenga}
                    userId={userId}
                ></RengaSubmission>
            ) : undefined}
            {createRengaOn ? (
                <RengaForm
                    partyId={partyId}
                    userId={userId}
                    onCreated={() => setCreateRengaOn(false)}
                ></RengaForm>
            ) : (
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                        onClick={() => setCreateRengaOn(true)}
                    >
                        New Renga
                    </button>
                    <Rengas
                        partyId={partyId}
                        onClickRenga={(rengaId) => setSolvingRenga(rengaId)}
                    />
                </div>
            )}
        </div>
    )
}

export default Party
