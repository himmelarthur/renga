import JwtDecode from 'jwt-decode'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAccount } from './Account/hooks'

export type TokenBody = { userId: number; partyId: string; username?: string }

export type Player = {
    userId: number
    username?: string
}

type PartyContextProps = {
    partyId?: string
    player?: Player
    ready: boolean
    addParty: (token?: string) => string | undefined
}

export const PartyContext = createContext<PartyContextProps>({
    partyId: undefined,
    player: undefined,
    addParty: () => undefined,
    ready: false,
})

export const PartyProvider = ({ children }: { children: React.ReactNode }) => {
    const [ready, setReady] = useState(false)
    const [player, setPlayer] = useState<Player>()
    const { partyId } = useParams()
    const {
        getTokenFromAccount,
        isAuthenticated,
        loading,
        refreshAccount,
        user,
    } = useAccount()

    useEffect(() => {
        if (isAuthenticated && user) {
            refreshAccount(user)
        }
    }, [isAuthenticated, user])

    // Set player depending on token
    useEffect(() => {
        const setTokenFromAccount = async (partyId: string) => {
            const token = await getTokenFromAccount(partyId)
            addParty(token)
        }

        // No party means no player
        if (!partyId) {
            setPlayer(undefined)
            setReady(true)
        } else {
            const token = localStorage.getItem(`token:${partyId}`)

            // Try to get token locally
            if (token) {
                const player: TokenBody = JwtDecode(token)
                setPlayer(player)
                setReady(true)
            }
            // Try to get token remotely
            else if (isAuthenticated) {
                setTokenFromAccount(partyId)
            }
            // Ready when loading is over
            setReady(!loading)
        }
        // DONT ADD getTokenFromAccount to dep array infinite loop ?
    }, [partyId, setPlayer, loading, isAuthenticated])

    // Set partyId depending on the current page
    useEffect(() => {
        if (partyId) {
            sessionStorage.setItem('currentPartyId', partyId)
        }
    }, [partyId])

    const addParty = (token?: string) => {
        if (!token) {
            setPlayer(undefined)
            return
        }
        const player: TokenBody = JwtDecode(token)
        if (player.partyId) {
            localStorage.setItem(`token:${player.partyId}`, token)
        }
        setPlayer(player)
        return player.partyId
    }

    return (
        <PartyContext.Provider
            value={{
                partyId,
                addParty,
                ready,
                player,
            }}
        >
            {children}
        </PartyContext.Provider>
    )
}

export const useParty = () => useContext(PartyContext)
