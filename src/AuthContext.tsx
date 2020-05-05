import { createContext } from 'react'

export type Player = {
    userId: number
    // TODO: Remove ? when ubiquitous
    username?: string
}

type Context = {
    player?: Player
    setPlayer: (user?: Player) => void
}

export const PlayerContext = createContext<Context>({
    player: undefined,
    setPlayer: () => {},
})
