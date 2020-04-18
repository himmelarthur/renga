import React, { FormEvent, useRef, useEffect } from 'react'
import gql from 'graphql-tag'
import { useJoinPartyMutation, GetPlayersDocument } from '../generated/graphql'
import { useParty } from '../hooks'
import Button from '../components/Button'

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
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: FormEvent) => {
        joinParty({
            variables: {
                partyId,
                username,
            },
            refetchQueries: [
                { query: GetPlayersDocument, variables: { partyId } },
            ],
        })
        e.stopPropagation()
        e.preventDefault()
        return false
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

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
                    ref={inputRef}
                    type="text"
                    value={username}
                    onChange={(evt) => setUsername(evt.target.value)}
                    placeholder="Enter your username"
                    className="shadow outline-none appearance-none sm:mr-4 sm:mb-0 rounded p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full sm:w-auto "
                />
                <Button
                    disabled={!username.length}
                    className="my-4 sm:my-0 rounded w-full sm:w-auto"
                    onClick={handleSubmit}
                >
                    Join the party
                </Button>
            </form>
            <p className="text-red-500 mt-2 text-sm">
                {error && 'Sorry this party does not exist, start a new one'}
            </p>
        </div>
    )
}

type Props = {
    partyId: string
}
export default JoinForm
