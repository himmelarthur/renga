import React, { useState, useCallback } from 'react'
import jwtDecode from 'jwt-decode'
import gql from 'graphql-tag'
import { useCreatePartyMutation } from './generated/graphql'

gql`
    mutation CreateParty($username: String!) {
        createParty(username: $username)
    }
`

export default () => {
    const [create] = useCreatePartyMutation()
    const [username, setUsername] = useState('')
    const onCreate = useCallback(async () => {
        if (!username) return
        const res = await create({ variables: { username } })
        try {
            const token = res.data?.createParty
            if (!token) {
                return
            }
            const { party } = jwtDecode(token)
            localStorage.setItem('token', token)
            window.location.href = `/p/${party.id}`
        } catch (err) {}
    }, [username])
    return (
        <div className="m-20">
            <h1 className="text-4xl mb-4">Renga</h1>
            <input
                type="text"
                placeholder="Your username"
                className="shadow appearance-none mr-4 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onCreate}
            >
                Start Party
            </button>
        </div>
    )
}
