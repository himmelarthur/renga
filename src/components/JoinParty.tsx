import classNames from 'classnames'
import gql from 'graphql-tag'
import * as React from 'react'
import { useJoinPartyMutation } from '../generated/graphql'
import { useParty } from '../hooks'

interface IJoinPartyProps {
    className?: string
}

gql`
    mutation joinParty($partyId: String!, $username: String!) {
        joinParty(partyId: $partyId, username: $username)
    }
`

const JoinParty: React.FC<IJoinPartyProps> = ({ className }) => {
    const { partyId, addParty } = useParty()

    if (!partyId) throw new Error('Token invitation should be provided')

    const [joinParty, { error }] = useJoinPartyMutation({
        onCompleted: (data) => {
            addParty(data.joinParty)
        },
    })
    const [username, setUsername] = React.useState('')

    const handleSubmit = () => {
        joinParty({
            variables: {
                partyId,
                username,
            },
        })
    }

    return (
        <div className={classNames(className, 'p-4')}>
            <h1 className="text-4xl mb-4 text-gray-900">Join a party</h1>
            <input
                type="text"
                placeholder="Your username"
                className="shadow appearance-none mr-4 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={!username.length}
                onClick={handleSubmit}
            >
                Join
            </button>
            <p className="text-red-500 font-semibold">
                {error?.graphQLErrors.map((x) => x.message).join(', ')}
            </p>
        </div>
    )
}

export default JoinParty
