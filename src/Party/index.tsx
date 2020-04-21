import React from 'react'
import { Redirect } from 'react-router-dom'
import { useParty } from '../hooks'
import JoinParty from './JoinParty'
import Party from './Party'

const PartyPage = () => {
    const { user, partyId, ready } = useParty()

    if (!ready) return <div></div>

    if (!partyId) {
        return <Redirect to="/"></Redirect>
    }
    if (!user) {
        return <JoinParty partyId={partyId} />
    }

    return <Party user={user} partyId={partyId} />
}

export default PartyPage
