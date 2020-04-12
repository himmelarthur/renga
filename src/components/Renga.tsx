import React from 'react'
import { Renga as RengaType, User } from '../generated/graphql'
import { Emoji } from 'emoji-mart'
import moment from 'moment'

const Renga = ({ renga }: Props) => (
    <div className="flex flex-col justify-center items-center w-40 mr-4 mb-4 rounded hover:bg-gray-200 p-2 cursor-pointer">
        <div className="flex flex-row justify-around">
            {renga.emojis.map((emoji) => (
                <Emoji size={32} native emoji={emoji} />
            ))}
        </div>
        <div className="flex items-center justify-center text-center text-gray-700 text-xs">
            Posted by {renga.author.username}{' '}
            {moment(renga.createdAt).fromNow()}
        </div>
    </div>
)

type Props = {
    renga: Pick<RengaType, 'id' | 'emojis' | 'createdAt'> & {
        author: { __typename?: 'User' } & Pick<User, 'id' | 'username'>
    }
}

export default Renga
