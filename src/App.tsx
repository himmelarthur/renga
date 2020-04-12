import React, { useEffect, useState } from 'react'

import Landing from './Landing/Landing'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Party from './Party/Party'
import { AuthContext } from './AuthContext'
import JwtDecode from 'jwt-decode'
import Join from './Join'

export default () => {
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState<number>()
    useEffect(() => {
        const token = localStorage.getItem('token')
        try {
            if (token === null) {
                setReady(true)
                return
            }
            const { userId } = JwtDecode(token)
            setUserId(userId)
        } finally {
            setReady(true)
        }
    }, [])
    if (!ready) {
        return <div></div>
    }
    return (
        <AuthContext.Provider value={{ userId, setUserId }}>
            <Router>
                <Switch>
                    <Route path="/p/:partyId">
                        <Party></Party>
                    </Route>
                    <Route path="/join">
                        <Join></Join>
                    </Route>
                    <Route path="/" exact>
                        <Landing></Landing>
                    </Route>
                </Switch>
            </Router>
        </AuthContext.Provider>
    )
}
