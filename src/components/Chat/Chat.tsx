import React, { useState, useCallback } from 'react'
import gql from 'graphql-tag'
import {
    useGetChatMessagesQuery,
    usePostMessageMutation,
    GetChatMessagesDocument,
} from '../../generated/graphql'
import moment from 'moment'

gql`
    query GetChatMessages($partyId: String!) {
        chatMessages(
            where: { partyId: { equals: $partyId } }
            orderBy: { createdAt: desc }
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
    const onPost = useCallback(async () => {
        await post({
            variables: {
                message,
                partyId,
                authorId: userId,
            },
        })
        setMessage('')
    }, [message, setMessage])
    if (!data || loading) return <div></div>
    return (
        <div>
            {data.chatMessages.map((message) => (
                <div key={message.id} className="mb-4">
                    <div className="flex items-baseline">
                        <div className="text-sm font-bold mr-3">
                            {message.author.username}
                        </div>
                        <div className="text-xs">
                            {moment(message.createdAt).format('HH:mm')}
                        </div>
                    </div>
                    <div>{message.message}</div>
                </div>
            ))}
            <input
                type="text"
                value={message}
                placeholder="Your message..."
                className="shadow appearance-none mr-4 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onPost}
            >
                Post
            </button>
        </div>
    )
}

type Props = {
    partyId: string
    userId: number
}

export default Chat
