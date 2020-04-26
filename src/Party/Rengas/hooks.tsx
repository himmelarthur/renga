import { useState, useEffect } from 'react'
import { useGetRengasQuery } from '../../generated/graphql'

const POLLING_INTERVAL = Number(process.env.REACT_APP_POLL_INTERVAL) || 0

export const useFetchRengas = (partyId: string, pageCount: number = 19) => {
    const [page, setPage] = useState(0)
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
    const [reachedEnd, setReachedEnd] = useState(false)
    const { loading, data, fetchMore, networkStatus } = useGetRengasQuery({
        variables: { partyId, first: pageCount, skip: 0 },
        fetchPolicy: 'cache-and-network',
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

    return {
        loading,
        data,
        page,
        networkStatus,
        fetchMoreLoading,
        fetchMore: async () => {
            if (reachedEnd) return
            setFetchMoreLoading(true)
            setPage(page + 1)
            await fetchMore({
                variables: {
                    skip: (page + 1) * pageCount,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev
                    if (fetchMoreResult.rengas.length === 0) {
                        setReachedEnd(true)
                        return prev
                    }
                    return {
                        ...prev,
                        rengas: [...prev.rengas, ...fetchMoreResult?.rengas],
                    }
                },
            })
            setFetchMoreLoading(false)
        },
    }
}
