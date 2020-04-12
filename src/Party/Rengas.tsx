import React from 'react'
import gql from 'graphql-tag'
import { useGetRengasQuery, useCreateRengaMutation } from '../generated/graphql'
import { Emoji } from 'emoji-mart'
import Renga from '../components/Renga'

gql`
    query GetRengas($partyId: String!) {
        rengas(where: { partyId: { equals: $partyId } }) {
            id
            emojis
            author {
                id
                username
            }
            createdAt
        }
    }
`

const Rengas = ({ partyId }: Props) => {
    const { data, loading } = useGetRengasQuery({ variables: { partyId } })
    if (loading) {
        return <div></div>
    }
    return (
        <div className="flex flex-row flex-wrap">
            {data?.rengas.map((renga) => (
                <Renga key={renga.id} renga={renga} />
            ))}
        </div>
    )
}

type Props = { partyId: string }

export default Rengas
