import JwtDecode from 'jwt-decode'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAccount } from '../Account/hooks'
import { PlayerContext } from '../AuthContext'

// TODO: Remove ? when ubiquitous
export type TokenBody = { userId: number; partyId: string; username?: string }

export const useParty = () => {
    const [ready, setReady] = useState(false)
    const { player, setPlayer } = useContext(PlayerContext)
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

    return { addParty, player, partyId, ready }
}
