import { useState, useLayoutEffect } from 'react'
import { useGetPlayersQuery } from '../../generated/graphql'
import { useAnimation } from 'framer-motion'

export const useFetchLeaderboard = (partyId: string, userId?: number) => {
    const [userScore, setUserScore] = useState<number>()
    const { data, loading } = useGetPlayersQuery({
        errorPolicy: 'all', // not fan but when because userId can be null ...
        variables: { partyId },
        pollInterval: Number(process.env.REACT_APP_POLL_INTERVAL) || undefined,
        onCompleted: (data) =>
            setUserScore(
                data.party?.users.find(({ id }) => id === userId)?.score
            ),
    })
    const animationControl = useAnimation()

    useLayoutEffect(() => {
        if (!data) {
            return
        }
        const newUserScore = data.party?.users.find(({ id }) => id === userId)
            ?.score
        if (newUserScore && userScore && newUserScore > userScore) {
            animationControl.start({
                scale: [1, 1.3, 1],
                transition: { delay: 1, duration: 0.5 },
            })
        }
        setUserScore(newUserScore)
    }, [data, userScore, animationControl, userId])
    return { data, loading, animationControl }
}
