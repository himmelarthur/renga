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
    setPlayer: (user?: Player) => void
    addParty: (token?: string) => string | undefined
}

export const PartyContext = createContext<PartyContextProps>({
    partyId: undefined,
    player: undefined,
    setPlayer: () => {},
    addParty: () => undefined,
    ready: false,
})

export const PartyProvider = ({ children }: { children: React.ReactNode }) => {
    const [ready, setReady] = useState(false)
    const [player, setPlayer] = useState<Player>()
    const { partyId } = useParams()
    const { getTokenFromAccount, isAuthenticated, loading } = useAccount()

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

            // Try to get token remotely
            if (isAuthenticated) {
                setTokenFromAccount(partyId)
            }
            // Try to get token locally
            else if (token) {
                const player: TokenBody = JwtDecode(token)
                setPlayer(player)
                setReady(true)
            }
            // Ready when loading is over
            setReady(!loading)
        }
    }, [partyId, setPlayer, loading, isAuthenticated, getTokenFromAccount])

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
                setPlayer,
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
