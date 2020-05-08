import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useAuth0 } from '../utils/auth0'

const PrivateRoute = ({
    Component,
    path,
    exact,
}: {
    Component: any
    path: string
    exact: boolean
}) => {
    const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

    useEffect(() => {
        if (loading || isAuthenticated) {
            return
        }
        const fn = async () => {
            await loginWithRedirect?.({
                appState: { targetUrl: window.location.pathname },
            })
        }
        fn()
    }, [loading, isAuthenticated, loginWithRedirect, path])
    const render = (props: any) =>
        isAuthenticated === true ? <Component {...props} /> : null

    return <Route path={path} render={render} exact={exact} />
}

export default PrivateRoute
