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
            isResolved
        }
    }
`

const Rengas = ({
    partyId,
    highlightedRenga,
    noRengasComponent,
    onClickRenga,
    displayNewButton,
    onClickNew,
}: Props) => {
    const { data, loading } = useGetRengasQuery({ variables: { partyId } })
    if (loading) {
        return <div></div>
    }
    return (
        <div className="flex flex-row flex-wrap justify-center sm:justify-start">
            {displayNewButton ? (
                <div
                    className="flex flex-col justify-center items-center sm:w-40 w-32 mr-4 mb-4 rounded hover:bg-gray-200 p-2 cursor-pointer text-primary font-medium uppercase bg-gray-100"
                    onClick={onClickNew}
                >
                    + New renga
                </div>
            ) : undefined}
            {data?.rengas.length
                ? data?.rengas.map((renga) => (
                      <Renga
                          key={renga.id}
                          renga={renga}
                          highlighted={highlightedRenga === renga.id}
                          onClick={() => onClickRenga(renga.id)}
                      />
                  ))
                : noRengasComponent}
        </div>
    )
}

type Props = {
    partyId: string
    onClickRenga: (rengaId: number) => void
    noRengasComponent?: JSX.Element
    highlightedRenga?: number
    displayNewButton?: boolean
    onClickNew?: () => void
}

export default Rengas
