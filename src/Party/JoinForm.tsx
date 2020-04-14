import React, { FormEvent } from 'react'
import gql from 'graphql-tag'
import { useJoinPartyMutation } from '../generated/graphql'
import { useParty } from '../hooks'

gql`
    mutation joinParty($partyId: String!, $username: String!) {
        joinParty(partyId: $partyId, username: $username)
    }
`
const JoinForm = ({ partyId }: Props) => {
    const { addParty } = useParty()
    const [joinParty, { error }] = useJoinPartyMutation({
        onCompleted: (data) => {
            addParty(data.joinParty)
        },
    })
    const [username, setUsername] = React.useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        joinParty({
            variables: {
                partyId,
                username,
            },
        })
        e.stopPropagation()
        e.preventDefault()
        return false
    }

    return (
        <div>
            <div className="text-gray-700 font-medium mb-4">
                Enter your username and start guessing which movies are behind
                the emojis below.
            </div>
            <form
                className="flex flex-col sm:flex-row items-center"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    value={username}
                    onChange={(evt) => setUsername(evt.target.value)}
                    placeholder="Enter your username"
                    className="shadow appearance-none mr-4 mb-4 sm:mb-0 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    disabled={!username.length}
                    className="bg-primary hover:opacity-75 text-white py-2 px-4 rounded"
                >
                    Join the party
                </button>
            </form>
            <p className="text-red-500 font-medium">
                {error && 'Sorry this party does not exist, start a new one'}
            </p>
        </div>
    )
}

type Props = {
    partyId: string
}
export default JoinForm