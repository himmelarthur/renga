import React from 'react'
import Rengas from './Rengas'
import { useParams, Redirect } from 'react-router-dom'

const Party = () => {
    const { partyId } = useParams()
    if (!partyId) return <Redirect to="/"></Redirect>
    return (
        <div className="m-20">
            <h1 className="text-4xl mb-4">Renga</h1>
            <Rengas partyId={partyId} />
        </div>
    )
}

export default Party
