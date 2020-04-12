import React from 'react'

import Landing from './Landing/Landing'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Party from './Party/Party'

export default () => (
    <Router>
        <Switch>
            <Route path="/p/:partyId">
                <Party></Party>
            </Route>
            <Route path="/" exact>
                <Landing></Landing>
            </Route>
        </Switch>
    </Router>
)
