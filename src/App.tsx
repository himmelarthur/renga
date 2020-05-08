import React, { useEffect } from 'react'
import { Route, Switch, useLocation, Router } from 'react-router-dom'
import config from './auth_config.json'
import Landing from './Landing/Landing'
import Party from './Party'
import { PartyProvider } from './PartyContext'
import { Auth0Provider } from './utils/auth0'
import { track } from './utils/tracking'
import Profile from './Profile'
import history from './utils/history'
import PrivateRoute from './components/PrivateRoute'

const onRedirectCallback = (appState: any) => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    )
}

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
            onRedirectCallback={onRedirectCallback}
        >
            <Router history={history}>
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
                    <PrivateRoute path="/me" Component={Profile} exact />
                </Switch>
            </Router>
        </Auth0Provider>
    )
}
