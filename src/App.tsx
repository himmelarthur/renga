import React, { useState, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import Landing from './Landing/Landing'
import Party from './Party'
import { AuthContext } from './AuthContext'

export default () => {
    const [userId, setUserId] = useState<number>()
    const location = useLocation()
    useEffect(() => {
        window.heap?.track('View Page', {
            page: location.pathname,
        })
    }, [location])
    return (
        <AuthContext.Provider value={{ userId, setUserId }}>
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
