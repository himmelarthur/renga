import { useAnimation } from 'framer-motion'
import { useState, useLayoutEffect } from 'react'
import { useGetRengasQuery } from '../../generated/graphql'

export const useFetchRengas = (partyId: string) => {
    const animationControl = useAnimation()
    const [rengaIds, setRengaIds] = useState<number[]>()
    const fetchState = useGetRengasQuery({
        variables: { partyId },
        pollInterval: Number(process.env.REACT_APP_POLL_INTERVAL) || undefined,
        onCompleted: (data) => setRengaIds(data.rengas.map(({ id }) => id)),
    })

    useLayoutEffect(() => {
        if (!rengaIds?.length) {
            // Rengas not fetched yet
            return
        }
        const newRengaIds = fetchState.data?.rengas
            .filter(({ id }) => !rengaIds?.includes(id))
            .map(({ id }) => id)
        if (!newRengaIds?.length) {
            // No new rengas
            return
        }
        animationControl.start((rengaId) =>
            newRengaIds.includes(rengaId)
                ? {
                      scale: [1, 1.3, 1],
                      transition: { delay: 1, duration: 0.5 },
                  }
                : {}
        )
        setRengaIds(fetchState.data?.rengas.map(({ id }) => id))
    }, [fetchState.data, rengaIds, animationControl])

    return { animationControl: animationControl, fetchState }
}
