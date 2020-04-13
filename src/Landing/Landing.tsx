import gql from 'graphql-tag'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useCreatePartyMutation } from '../generated/graphql'
import { useParty } from '../hooks'
import EmojiRoulette from './EmojiRoulette'

gql`
    mutation CreateParty($username: String!) {
        createParty(username: $username)
    }
`

const Landing = () => {
    const [create] = useCreatePartyMutation()
    const [username, setUsername] = useState('')
    const { addParty } = useParty()
    const history = useHistory()

    const onCreate = useCallback(async () => {
        if (!username) return
        const res = await create({ variables: { username } })
        try {
            const partyId = addParty(res.data?.createParty)
            if (partyId) {
                history.push(`/p/${partyId}`)
            }
        } catch (err) {
            console.error(err)
        }
    }, [username, create, history, addParty])
    return (
        <div
            className="p-10 h-screen"
            style={{
                background: 'linear-gradient(-30deg, #eae2e6 0%, white 100%)',
            }}
        >
            <h1 className="mb-4 text-primary font-logo text-6xl">Renga</h1>
            <h2 className="text-primary text-center text-2xl font-medium my-8 sm:mt-32">
                Make your friends guess movies with only three emojis
            </h2>
            <EmojiRoulette />
            <div className="mt-10 justify-center flex flex-col items-center sm:flex-row">
                <input
                    type="text"
                    placeholder="Your username..."
                    className="shadow w-full sm:w-auto sm:mr-8 text-xl appearance-none rounded py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={username}
                    onChange={(evt) => setUsername(evt.target.value)}
                />
                <button
                    className="hover:bg-blue-700 w-full sm:w-auto text-white py-2 px-4 rounded text-xl font-medium mt-4 sm:mt-0 hover:opacity-75"
                    style={{
                        background:
                            'linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%)',
                    }}
                    onClick={onCreate}
                >
                    <span className="mr-2">🎮</span>Start Party
                </button>
            </div>
        </div>
    )
}
export default Landing
