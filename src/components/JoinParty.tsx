import * as React from 'react'
import gql from 'graphql-tag'
import { useJoinPartyMutation } from '../generated/graphql'
import classNames from 'classnames'
import JwtDecode from 'jwt-decode'
import { useLocation, useHistory } from 'react-router-dom'

interface IJoinPartyProps {
    className?: string
}

gql`
    mutation joinParty($token: String!, $username: String!) {
        joinParty(token: $token, username: $username)
    }
`

const JoinParty: React.FC<IJoinPartyProps> = ({ className }) => {
    const history = useHistory()
    const [joinParty, { error }] = useJoinPartyMutation({
        onError: () => 1, // FIXME
        onCompleted: (data) => {
            const token = data.joinParty
            const { partyId } = JwtDecode(token)
            localStorage.setItem('token', token)
            history.push(`/p/${partyId}`)
        },
    })
    const [username, setUsername] = React.useState('')

    const { search } = useLocation()
    const usp = new URLSearchParams(search)
    const token = usp.get('token')

    const handleSubmit = () => {
        if (!token) throw new Error('Token invitation should be provided')
        joinParty({
            variables: {
                token,
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
            <p className="text-red-700 font-semibold">
                {error?.graphQLErrors.map((x) => x.message).join(', ')}
            </p>
        </div>
    )
}

export default JoinParty
