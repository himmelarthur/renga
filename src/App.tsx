import React, { useEffect, useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Player, PartyContext, PartyProvider } from './AuthContext'
import config from './auth_config.json'
import Landing from './Landing/Landing'
import Party from './Party'
import { Auth0Provider } from './utils/auth0'
import { track } from './utils/tracking'

export default () => {
    const location = useLocation()
    useEffect(() => {
        track('View Page', {
            page: location.pathname,
        })
    }, [location])
    return (
        <Auth0Provider
            initOptions={{
                domain: config.domain,
                client_id: config.clientId,
                redirect_uri: window.location.origin,
                audience: config.audience,
            }}
        >
            <Switch>
                <Route path="/p/:partyId">
                    <PartyProvider>
                        <Party></Party>
                    </PartyProvider>
                </Route>
                <Route path="/" exact>
                    <PartyProvider>
                        <Landing></Landing>
                    </PartyProvider>
                </Route>
            </Switch>
        </Auth0Provider>
    )
}
