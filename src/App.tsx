import React, { useState, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import Landing from './Landing/Landing'
import Party from './Party'
import { AuthContext, User } from './AuthContext'
import { track } from './utils/tracking'

export default () => {
    const [user, setUser] = useState<User>()
    const location = useLocation()
    useEffect(() => {
        track('View Page', {
            page: location.pathname,
        })
    }, [location])
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
