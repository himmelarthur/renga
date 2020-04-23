import gql from 'graphql-tag'
import { useDeleteRengaMutation } from '../../generated/graphql'
import { track } from '../../utils/tracking'
import moment from 'moment'

gql`
    mutation deleteRenga($rengaId: Int!, $date: DateTime!) {
        updateOneRenga(data: { deletedAt: $date }, where: { id: $rengaId }) {
            id
            deletedAt
        }
    }
`

export const useDeleteRenga = () => {
    const [deleteRenga] = useDeleteRengaMutation({
        onCompleted: (data) =>
            track('Delete Renga', { id: data.updateOneRenga?.id }),
    })

    const handleDelete = (rengaId: number) => {
        track('Click Delete Renga', { rengaId })
        const answer = window.confirm(
            'Are you sure you want to delete this renga?'
        )
        if (answer) {
            deleteRenga({
                variables: {
                    rengaId,
                    date: moment(),
                },
            })
        }
        track('Cancel Delete Renga', { rengaId })
    }
    return { handleDelete }
}
