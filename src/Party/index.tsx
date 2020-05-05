import React from 'react'
import { Redirect } from 'react-router-dom'
import { useParty } from './hooks'
import JoinParty from './JoinParty'
import Party from './Party'

const PartyPage = () => {
    const { player, partyId, ready } = useParty()

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
