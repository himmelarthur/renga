import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import JwtDecode from 'jwt-decode'
import { useParams } from 'react-router-dom'

export const useParty = () => {
    const [ready, setReady] = useState(false)
    const { userId, setUserId } = useContext(AuthContext)
    const { partyId } = useParams()

    useEffect(() => {
        if (!partyId) {
            setUserId(undefined)
        }
        const token = localStorage.getItem(`token:${partyId}`)
        if (token) {
            const { userId } = JwtDecode(token)
            setUserId(userId)
        } else {
            setUserId(undefined)
        }
        setReady(true)
    }, [partyId, setUserId])

    useEffect(() => {
        if (partyId) {
            sessionStorage.setItem('currentPartyId', partyId)
        }
    }, [partyId])

    useEffect(() => {
        if (partyId && window.$crisp && userId) {
            window.$crisp.push([
                'set',
                'user:nickname',
                [`user:${userId.toString()}`],
            ])
            window.$crisp.push([
                'set',
                'session:data',
                [[['partyId', partyId]]],
            ])
            window.heap?.identify(userId.toString())
            window.heap?.addUserProperties({
                partyId,
            })
        }
    }, [partyId, userId])

    const addParty = (token?: string) => {
        if (!token) return
        const { partyId, userId } = JwtDecode(token)
        localStorage.setItem(`token:${partyId}`, token)
        setUserId(userId)
        return partyId
    }

    return { addParty, userId, partyId, ready }
}
