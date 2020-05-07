import React from 'react'
import { Redirect } from 'react-router-dom'
import { useParty } from '../PartyContext'
import { useGlobalTracking } from '../utils/tracking'
import JoinParty from './JoinParty'
import Party from './Party'

const PartyPage = () => {
    const { player, partyId, ready } = useParty()
    useGlobalTracking()
    if (!ready) return <div></div>

    if (!partyId) {
        return <Redirect to="/"></Redirect>
    }
    if (!player) {
        return <JoinParty partyId={partyId} />
    }

    return <Party user={player} partyId={partyId} />
}

export default PartyPage
