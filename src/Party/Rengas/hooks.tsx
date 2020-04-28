import { useState, useEffect } from 'react'
import { useGetRengasQuery } from '../../generated/graphql'
import { track } from '../../utils/tracking'

const POLLING_INTERVAL = Number(process.env.REACT_APP_POLL_INTERVAL) || 0

export const useFetchRengas = (partyId: string, pageCount: number) => {
    const [page, setPage] = useState(0)
    const [isFetchingMore, setIsFetchingMore] = useState(false)
    const [hasReachEnd, setHasReachEnd] = useState(false)

    const { loading, data, fetchMore } = useGetRengasQuery({
        variables: { partyId, first: pageCount, skip: 0 },
        fetchPolicy: 'cache-and-network',
        partialRefetch: true,
    })

    useEffect(() => {
        const interval = setInterval(async () => {
            await fetchMore({
                variables: {
                    skip: 0,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev
                    const currentRengaIds = new Set(
                        prev.rengas.map((renga) => renga.id)
                    )
                    const newRengas = fetchMoreResult.rengas.filter(
                        (renga) => !currentRengaIds.has(renga.id)
                    )
                    return {
                        ...prev,
                        rengas: [...newRengas, ...prev.rengas],
                    }
                },
            })
        }, POLLING_INTERVAL)
        return () => clearInterval(interval)
    }, [])

    const fetchMoreRengas = async () => {
        track('Fetched More Rengas', { hasReachEnd })
        if (hasReachEnd) return
        setIsFetchingMore(true)
        setPage(page + 1)
        await fetchMore({
            variables: {
                skip: (page + 1) * pageCount,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                if (fetchMoreResult.rengas.length === 0) {
                    setHasReachEnd(true)
                    return prev
                }
                return {
                    ...prev,
                    rengas: [...prev.rengas, ...fetchMoreResult?.rengas],
                }
            },
        })
        setIsFetchingMore(false)
    }
    return {
        loading,
        data,
        page,
        isFetchingMore,
        fetchMoreRengas,
        hasReachEnd,
    }
}
