import React from 'react'
import { useAuth0 } from '../utils/auth0'
import AccountRengaList from './AccountRengaList'
import AccountStats from './AccountStats'

export interface ProfileProps {
    className?: string
}

export default ({ className }: ProfileProps) => {
    const { user } = useAuth0()

    if (!user) return <div></div>

    return (
        <div className="flex flex-col items-center bg-gray-100 h-screen p-4 overflow-scroll">
            <div className="flex flex-row w-full">
                <h1 className="text-primary font-logo text-3xl">
                    <a href="/">Renga</a>
                </h1>
            </div>
            <div className="w-full max-w-4xl mt-4">
                <AccountStats auth0Id={user.sub} />
                <AccountRengaList
                    className="mt-16"
                    auth0Id={user.sub}
                ></AccountRengaList>
            </div>
        </div>
    )
}
