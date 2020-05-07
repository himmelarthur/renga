import { useEffect, useState } from 'react'
import JwtDecode from 'jwt-decode'

export const usePlaylistToken = (playlistId: string) => {
    const LS_KEY = `playlist:${playlistId}`
    const [token, setToken] = useState<string>()
    const [solvedRengas, setSolvedRengas] = useState<number[]>([])
    useEffect(() => {
        const lsToken = localStorage.getItem(LS_KEY)
        if (lsToken === null) {
            return
        }
        updateToken(lsToken)
    }, [])
    const updateToken = (token: string) => {
        setToken(token)
        localStorage.setItem(LS_KEY, token)
        try {
            const { rengaIds } = JwtDecode(token)
            setSolvedRengas(rengaIds)
        } catch (err) {}
    }
    return { token, updateToken, solvedRengas }
}
