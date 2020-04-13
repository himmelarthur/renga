import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './Landing/Landing'
import Party from './Party'
import { AuthContext } from './AuthContext'

export default () => {
    const [userId, setUserId] = useState<number>()
    return (
        <AuthContext.Provider value={{ userId, setUserId }}>
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
        </AuthContext.Provider>
    )
}
