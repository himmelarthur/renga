import React, { useState, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import Landing from './Landing/Landing'
import Party from './Party'
import { AuthContext, User } from './AuthContext'
import { track, useStaticUID } from './utils/tracking'

export default () => {
    const [user, setUser] = useState<User>()
    const location = useLocation()
    const staticUID = useStaticUID()
    useEffect(() => {
        track('View Page', {
            page: location.pathname,
        })
    }, [location])
    useEffect(() => {
        window.heap?.addUserProperties({ staticUID })
    }, [])
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <Switch>
                <Route path="/p/:partyId">
                    <Party></Party>
                </Route>
                <Route path="/" exact>
                    <Landing></Landing>
                </Route>
            </Switch>
        </AuthContext.Provider>
    )
}
