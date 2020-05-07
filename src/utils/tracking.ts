import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { v4 } from 'uuid'
import { PartyContext } from '../AuthContext'
import { useAuth0 } from './auth0'

export const track = (event: string, args?: {}) => {
    window.heap?.track(event, args)
}

export const useStaticUID = () => {
    // Generate and sets a party-invariant user id in the local storage if not present
    // and returns it
    const getStoredUID = () => {
        try {
            return localStorage.getItem('staticUID')
        } catch (err) {
            return null
        }
    }
    const storedUID = getStoredUID()
    if (storedUID === null) {
        const uid = v4()
        localStorage.setItem('staticUID', uid)
        return uid
    }
    return storedUID
}

const staticUID = useStaticUID()

export const useGlobalTracking = () => {
    const { player } = useContext(PartyContext)
    const { user } = useAuth0()
    const { partyId } = useParams()

    // Init trackers
    useEffect(() => {
        if (window.$crisp) {
            if (user) {
                window.$crisp.push([
                    'set',
                    'session:data',
                    [[['account', user.sub]]],
                ])
                window.$crisp.push(['set', 'user:email', [user.email]])
            }

            if (partyId) {
                window.$crisp.push([
                    'set',
                    'session:data',
                    [[['partyId', partyId]]],
                ])
            }

            if (partyId && player) {
                window.$crisp.push([
                    'set',
                    'user:nickname',
                    [`user:${player.username || player.userId.toString()}`],
                ])
                window.heap?.identify(staticUID)
                window.heap?.addUserProperties({
                    partyId,
                    partyUserId: player.userId,
                    ...(player.username ? { username: player.username } : {}),
                })
            }
        }
    }, [partyId, player, user])
}
