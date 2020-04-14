import React from 'react'
import { Redirect } from 'react-router-dom'
import { useParty } from '../hooks'
import Party from './Party'

const PartyPage = () => {
    const { userId, partyId, ready } = useParty()

    if (!ready) return <div></div>
    if (!partyId) {
        return <Redirect to="/"></Redirect>
    }
    return <Party userId={userId} partyId={partyId} />
}

export default PartyPage
