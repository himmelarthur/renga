import { useEffect, useState } from 'react'
import JwtDecode from 'jwt-decode'
import { useGetPlaylistRengasLazyQuery } from '../generated/graphql'

export const usePlaylist = (playlistId: string) => {
    const LS_KEY = `playlist:${playlistId}`
    const [token, setToken] = useState<string>()
    const [solvedRengas, setSolvedRengas] = useState<number[]>([])
    const [
        fetchRengas,
        { loading, data, refetch },
    ] = useGetPlaylistRengasLazyQuery({
        variables: { playlistId: playlistId! },
    })

    useEffect(() => {
        const lsToken = localStorage.getItem(LS_KEY)
        if (lsToken !== null) {
            updateToken(lsToken)
        }
        fetchRengas({
            context: {
                headers: lsToken
                    ? {
                          'X-Playlist-Token': lsToken,
                      }
                    : {},
            },
        })
    }, [])
    const updateToken = (token: string) => {
        setToken(token)
        localStorage.setItem(LS_KEY, token)
        try {
            const { rengaIds } = JwtDecode(token)
            setSolvedRengas(rengaIds)
        } catch (err) {}
    }
    return { token, updateToken, solvedRengas, loading, data, refetch }
}
