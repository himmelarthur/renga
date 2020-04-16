import gql from 'graphql-tag'

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
            status {
                isResolved
                isMine
            }
        }
    }
`
