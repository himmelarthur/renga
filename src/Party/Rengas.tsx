import React from 'react'
import gql from 'graphql-tag'
import { useGetRengasQuery } from '../generated/graphql'
import Renga from '../components/Renga'

gql`
    query GetRengas($partyId: String!) {
        rengas(
            where: { partyId: { equals: $partyId } }
            orderBy: { createdAt: desc }
        ) {
            id
            emojis
            author {
                id
                username
            }
            createdAt
            isMine
        }
    }
`

const Rengas = ({ partyId, highlightedRenga, onClickRenga }: Props) => {
    const { data, loading } = useGetRengasQuery({ variables: { partyId } })
    if (loading) {
        return <div></div>
    }
    return (
        <div className="flex flex-row flex-wrap justify-center sm:justify-start">
            {data?.rengas.map((renga) => (
                <Renga
                    key={renga.id}
                    renga={renga}
                    highlighted={highlightedRenga === renga.id}
                    onClick={() => onClickRenga(renga.id)}
                />
            ))}
        </div>
    )
}

type Props = {
    partyId: string
    onClickRenga: (rengaId: number) => void
    highlightedRenga?: number
}

export default Rengas
