import gql from 'graphql-tag'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAccount } from '../Account/hooks'
import Button from '../components/Button'
import { useCreatePartyMutation } from '../generated/graphql'
import { useParty } from '../PartyContext'
import { track, useGlobalTracking } from '../utils/tracking'
import EmojiRoulette from './EmojiRoulette'
import { LoginButton, Navigation } from '../components/TopBar'

gql`
    mutation CreateParty($username: String!) {
        createParty(username: $username)
    }
`

const Landing = () => {
    const [create, { loading }] = useCreatePartyMutation()
    const [username, setUsername] = useState('')
    const { addParty } = useParty()
    useGlobalTracking()
    const history = useHistory()

    useEffect(() => {
        track('View Landing')
    }, [])

    const { isAuthenticated, login, logout } = useAccount()

    const onCreate = useCallback(
        async (e: FormEvent) => {
            e.stopPropagation()
            e.preventDefault()
            if (!username) return false
            if (loading) return false
            track('Create Party')
            const res = await create({ variables: { username } })
            try {
                const partyId = addParty(res.data?.createParty)
                if (partyId) {
                    history.push(`/p/${partyId}`)
                }
            } catch (err) {
                console.error(err)
            }

            return false
        },
        [username, create, history, addParty, loading]
    )
    return (
        <div
            className="p-10 h-screen"
            style={{
                background: 'linear-gradient(-30deg, #eae2e6 0%, white 100%)',
            }}
        >
            <div className="flex flex-row justify-between sm:items-start items-baseline">
                <h1 className="mb-4 text-primary font-logo sm:text-6xl text-4xl">
                    Renga
                </h1>
                <Navigation />
            </div>
            <h2 className="text-primary text-center text-2xl font-medium my-8 sm:mt-32">
                Make your friends guess movies with only three emojis
            </h2>
            <EmojiRoulette />
            <form
                className="mt-10 justify-center flex flex-col items-center sm:flex-row"
                onSubmit={onCreate}
            >
                <input
                    type="text"
                    placeholder="Your username..."
                    className="shadow w-full sm:w-auto sm:mr-8 text-xl appearance-none rounded py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={username}
                    onChange={(evt) => setUsername(evt.target.value)}
                />
                <Button
                    loading={loading}
                    onClick={onCreate}
                    className="sm:w-auto mt-4 sm:mt-0"
                >
                    <>
                        <span className="mr-2" role="img" aria-label="">
                            🎮
                        </span>
                        Start Party
                    </>
                </Button>
            </form>
        </div>
    )
}
export default Landing
