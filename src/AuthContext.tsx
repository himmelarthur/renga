import { createContext } from 'react'

export type User = {
    userId: number
    // TODO: Remove ? when ubiquitous
    username?: string
}

type Context = {
    user?: User
    setUser: (user?: User) => void
}

export const AuthContext = createContext<Context>({
    user: undefined,
    setUser: () => {},
})
