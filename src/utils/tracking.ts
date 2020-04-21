import { v4 } from 'uuid'

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
