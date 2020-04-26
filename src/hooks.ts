import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import JwtDecode from 'jwt-decode'
import { useParams } from 'react-router-dom'
import { useStaticUID } from './utils/tracking'

// TODO: Remove ? when ubiquitous
type TokenBody = { userId: number; partyId: string; username?: string }

export const useParty = () => {
    const [ready, setReady] = useState(false)
    const { user, setUser } = useContext(AuthContext)
    const { partyId } = useParams()
    const staticUID = useStaticUID()

    useEffect(() => {
        if (!partyId) {
            setUser(undefined)
        }
        const token = localStorage.getItem(`token:${partyId}`)
        if (token) {
            const user: TokenBody = JwtDecode(token)
            setUser(user)
        } else {
            setUser(undefined)
        }
        setReady(true)
    }, [partyId, setUser])

    useEffect(() => {
        if (partyId) {
            sessionStorage.setItem('currentPartyId', partyId)
        }
    }, [partyId])

    useEffect(() => {
        if (partyId && window.$crisp && user) {
            window.$crisp.push([
                'set',
                'user:nickname',
                [`user:${user.username || user.userId.toString()}`],
            ])
            window.$crisp.push([
                'set',
                'session:data',
                [[['partyId', partyId]]],
            ])
            window.heap?.identify(staticUID)
            window.heap?.addUserProperties({
                partyId,
                partyUserId: user.userId,
                ...(user.username ? { username: user.username } : {}),
            })
        }
    }, [partyId, user])

    const addParty = (token?: string) => {
        if (!token) return
        const user: TokenBody = JwtDecode(token)
        if (user.partyId) {
            localStorage.setItem(`token:${user.partyId}`, token)
        }
        setUser(user)
        return user.partyId
    }

    return { addParty, user, partyId, ready }
}
