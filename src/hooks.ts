import { useContext, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import JwtDecode from 'jwt-decode'
import { useParams } from 'react-router-dom'

export const useParty = () => {
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
    }, [partyId, setUserId])

    useEffect(() => {
        if (partyId) {
            sessionStorage.setItem('currentPartyId', partyId)
        }
    }, [partyId])

    const addParty = (token?: string) => {
        if (!token) return
        const { partyId, userId } = JwtDecode(token)
        localStorage.setItem(`token:${partyId}`, token)
        setUserId(userId)
        return partyId
    }

    return { addParty, userId, partyId }
}
