import * as React from 'react'
import classNames from 'classnames'
import { useAccount } from '../Account/hooks'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router-dom'

export interface TopBarProps {
    className?: string
    partyId?: string
}

const LoginButton = ({ redirectTo }: { redirectTo?: string }) => {
    const { isAuthenticated, loading, login, logout } = useAccount()

    if (!isAuthenticated && !loading)
        return (
            <button className="text-gray-700" onClick={() => login(redirectTo)}>
                Log in
            </button>
        )
    else if (isAuthenticated)
        return (
            <button
                className="text-gray-700"
                onClick={() => logout?.({ returnTo: window.location.origin })}
            >
                Log out
            </button>
        )
    else
        return (
            <div className="absolute">
                <Loader
                    color="primary"
                    type="TailSpin"
                    height={24}
                    width={24}
                ></Loader>
            </div>
        )
}

export default ({ className, partyId }: TopBarProps) => {
    const history = useHistory()
    const { isAuthenticated, loading, login, logout } = useAccount()
    return (
        <div className={classNames(className)}>
            <div className="flex flex-row items-center justify-between">
                <div className="h-10 w-10">
                    <img src="/logo192.png" />
                </div>
                <div className="flex flex-row items-baseline space-x-4 text-sm sm:text-base sm:space-x-10">
                    <button
                        onClick={() => {
                            if (!isAuthenticated) login('/me')
                            else history.push('/me')
                        }}
                        className="text-gray-700"
                    >
                        My profile
                    </button>
                    <LoginButton />
                    <a
                        href="/"
                        target="_blank"
                        className="border border-primary px-2 py-2 sm:px-4 text-primary rounded"
                    >
                        Start new party
                    </a>
                </div>
            </div>
        </div>
    )
}
