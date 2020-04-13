import { createContext } from 'react'

type Context = {
    userId?: number
    setUserId: (userId?: number) => void
}

export const AuthContext = createContext<Context>({
    userId: undefined,
    setUserId: () => {},
})
