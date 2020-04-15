import React, { useState, FormEvent, useEffect, useRef } from 'react'
import gql from 'graphql-tag'
import {
    useGetChatMessagesQuery,
    usePostMessageMutation,
    GetChatMessagesDocument,
} from '../../generated/graphql'
import moment from 'moment'
import data from 'emoji-mart/data/all.json'
import { Emoji } from 'emoji-mart'

const EMOJIS = Object.values(data.categories)[1].emojis
const EMOJIS_LENGTH = EMOJIS.length

const userEmoji = (userId: number, partyId: string) =>
    EMOJIS[
        (userId +
            partyId.split('').reduce(function (a: number, b: string) {
                a = (a << 5) - a + b.charCodeAt(0)
                return a & a
            }, 0)) &
            EMOJIS_LENGTH
    ]

gql`
    query GetChatMessages($partyId: String!) {
        chatMessages(
            where: { partyId: { equals: $partyId } }
            orderBy: { createdAt: asc }
        ) {
            id
            message
            createdAt
            author {
                id
                username
            }
        }
    }
    mutation PostMessage($partyId: String!, $authorId: Int, $message: String!) {
        createOneChatMessage(
            data: {
                message: $message
                author: { connect: { id: $authorId } }
                party: { connect: { id: $partyId } }
            }
        ) {
            id
            message
            createdAt
            author {
                id
                username
            }
        }
    }
`

const Chat = ({ partyId, userId }: Props) => {
    const { data, loading } = useGetChatMessagesQuery({
        variables: {
            partyId,
        },
        pollInterval: 1000,
    })
    const [post] = usePostMessageMutation({
        refetchQueries: [
            { query: GetChatMessagesDocument, variables: { partyId } },
        ],
    })
    const [message, setMessage] = useState('')
    const scrollingComponent = useRef<HTMLDivElement>(null)
    const onPost = async (e: FormEvent) => {
        e.preventDefault()
        await post({
            variables: {
                message,
                partyId,
                authorId: userId,
            },
        })
        setMessage('')
        return false
    }
    useEffect(() => {
        if (scrollingComponent.current) {
            scrollingComponent.current.scrollTo(
                0,
                scrollingComponent.current.scrollHeight
            )
        }
    }, [data])
    if (!data || loading) return <div></div>
    return (
        <div className="sm:absolute relative bottom-0 right-0 pb-24 w-full">
            <h3 className="text-gray-700 text-2xl font-bold">Chat</h3>
            <div
                className="overflow-y-auto my-4"
                style={{ maxHeight: 400 }}
                ref={scrollingComponent}
            >
                {data.chatMessages.map((message) => (
                    <div key={message.id} className="mb-4 last:mb-0">
                        <div className="flex items-baseline">
                            <div>
                                <Emoji
                                    native
                                    size={16}
                                    emoji={userEmoji(
                                        message.author.id,
                                        partyId
                                    )}
                                ></Emoji>
                            </div>
                            <div className="text-sm font-bold mr-3">
                                {message.author.username}
                            </div>
                            <div className="text-xs">
                                {moment(message.createdAt).format('HH:mm')}
                            </div>
                        </div>

                        <div className="text-gray-700 text-sm">
                            {message.message}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={onPost}>
                <input
                    type="text"
                    value={message}
                    placeholder="Your message..."
                    className="w-full shadow appearance-none mr-4 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => setMessage(e.target.value)}
                />
            </form>
        </div>
    )
}

type Props = {
    partyId: string
    userId: number
}

export default Chat
