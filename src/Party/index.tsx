import React from 'react'
import { Redirect } from 'react-router-dom'
import { useParty } from '../hooks'
import Join from '../Join'
import AuthParty from './AuthParty'

const Party = () => {
    const { userId, partyId } = useParty()

    if (!partyId) {
        return <Redirect to="/"></Redirect>
    } else if (!userId) {
        return <Join />
    } else return <AuthParty userId={userId} partyId={partyId} />
}

export default Party
