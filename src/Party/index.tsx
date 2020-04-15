import React from 'react'
import { Redirect } from 'react-router-dom'
import { useParty } from '../hooks'
import JoinParty from './JoinParty'
import Party from './Party'

const PartyPage = () => {
    const { userId, partyId, ready } = useParty()

    if (!ready) return <div></div>

    if (!partyId) {
        return <Redirect to="/"></Redirect>
    }
    if (!userId) {
        return <JoinParty partyId={partyId} />
    }

    return <Party userId={userId} partyId={partyId} />
}

export default PartyPage
