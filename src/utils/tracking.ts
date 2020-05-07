import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { v4 } from 'uuid'
import { PlayerContext } from '../AuthContext'

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
    const { player } = useContext(PlayerContext)
    const { partyId } = useParams()

    // Init trackers
    useEffect(() => {
        if (partyId && window.$crisp && player) {
            window.$crisp.push([
                'set',
                'user:nickname',
                [`user:${player.username || player.userId.toString()}`],
            ])
            window.$crisp.push([
                'set',
                'session:data',
                [[['partyId', partyId]]],
            ])
            window.heap?.identify(staticUID)
            window.heap?.addUserProperties({
                partyId,
                partyUserId: player.userId,
                ...(player.username ? { username: player.username } : {}),
            })
        }
    }, [partyId, player])
}
