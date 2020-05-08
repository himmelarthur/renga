import createAuth0Client, {
    Auth0Client,
    Auth0ClientOptions,
    GetIdTokenClaimsOptions,
    GetTokenSilentlyOptions,
    GetTokenWithPopupOptions,
    LogoutOptions,
    PopupConfigOptions,
    RedirectLoginOptions,
} from '@auth0/auth0-spa-js'
import React, { useContext, useEffect, useState } from 'react'

export let Auth0: Auth0Client

export interface Auth0User {
    nickname: string
    name: string
    picture: string
    updated_at: string
    sub: string
    email: string
    email_verified: string
}

interface AuthContextProps {
    isAuthenticated: boolean
    user: Auth0User | undefined
    loading: boolean
    handleRedirectCallback: () => Promise<void>
    getIdTokenClaims?: (options?: GetIdTokenClaimsOptions) => any
    loginWithRedirect?: (options?: RedirectLoginOptions) => any
    getTokenSilently?: (options?: GetTokenSilentlyOptions) => any
    getTokenWithPopup?: (
        options?: GetTokenWithPopupOptions,
        config?: PopupConfigOptions
    ) => any
    logout?: (options?: LogoutOptions) => void
}

const DEFAULT_REDIRECT_CALLBACK = () => {
    console.log('foo')
    window.history.replaceState({}, document.title, window.location.pathname)
}

export const Auth0Context = React.createContext<AuthContextProps>({
    isAuthenticated: false,
    user: undefined,
    loading: false,
    handleRedirectCallback: () => Promise.resolve(),
})

export const useAuth0 = () => useContext(Auth0Context)
export const Auth0Provider = ({
    children,
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    initOptions,
}: {
    children: React.ReactNode
    onRedirectCallback?: (state: any) => void
    initOptions: Auth0ClientOptions
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState()
    const [auth0Client, setAuth0] = useState<Auth0Client>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0Client(initOptions)
            setAuth0(auth0FromHook)

            // How to make this client usable in apollo lnk without rewrite everything without hooks?
            Auth0 = auth0FromHook

            if (
                window.location.search.includes('code=') &&
                window.location.search.includes('state=')
            ) {
                const { appState } = await auth0FromHook.handleRedirectCallback()
                onRedirectCallback(appState)
            }

            const isAuthenticated = await auth0FromHook.isAuthenticated()

            setIsAuthenticated(isAuthenticated)

            if (isAuthenticated) {
                const user = await auth0FromHook.getUser()
                setUser(user)
            }

            setLoading(false)
        }
        initAuth0()
    }, [initOptions, onRedirectCallback])

    const handleRedirectCallback = async () => {
        setLoading(true)
        await auth0Client?.handleRedirectCallback()
        const user = await auth0Client?.getUser()
        setLoading(false)
        setIsAuthenticated(true)
        setUser(user)
    }
    return (
        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                handleRedirectCallback,
                getIdTokenClaims: () => auth0Client?.getIdTokenClaims(),
                loginWithRedirect: (args?: RedirectLoginOptions) =>
                    auth0Client?.loginWithRedirect(args),
                getTokenSilently: (...args) =>
                    auth0Client?.getTokenSilently(args),
                getTokenWithPopup: (...args) =>
                    auth0Client?.getTokenWithPopup(args),
                logout: (args: any) => auth0Client?.logout(args),
            }}
        >
            {children}
        </Auth0Context.Provider>
    )
}
