import React from 'react'
import { useAuth0 } from '../utils/auth0'
import CreatorRengaList from './CreatorRengaList'
import CreatorStats from './CreatorStats'
import { Redirect } from 'react-router-dom'

export interface ProfileProps {
    className?: string
}

export default ({ className }: ProfileProps) => {
    const { user, loading, isAuthenticated } = useAuth0()

    if (!loading && !isAuthenticated) return <Redirect to="/"></Redirect>
    if (!user) return <div></div>

    return (
        <div className="flex flex-col items-center bg-gray-100 h-screen p-4 overflow-auto">
            <div className="flex flex-row w-full">
                <h1 className="text-primary font-logo text-3xl">
                    <a href="/">Renga</a>
                </h1>
            </div>
            <div className="w-full max-w-4xl mt-4">
                <div className="flex flex-row space-x-4 mb-4 uppercase text-sm items-baseline">
                    <div className="px-3 py-1 rounded-full bg-teal-600 text-white cursor-pointer">
                        Creator
                    </div>
                    <div className="opacity-50 cursor-not-allowed">Solver</div>
                </div>
                <CreatorStats auth0Id={user.sub} />
                <CreatorRengaList
                    className="mt-4"
                    auth0Id={user.sub}
                ></CreatorRengaList>
            </div>
        </div>
    )
}
