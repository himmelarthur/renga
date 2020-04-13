import React from 'react'
import { Renga as RengaType, User } from '../generated/graphql'
import { Emoji } from 'emoji-mart'
import moment from 'moment'

const Renga = ({ renga, highlighted, onClick }: Props) => {
    return (
        <div
            className={`flex flex-col justify-center items-center sm:w-40 w-32 mr-4 mb-4 rounded hover:bg-gray-200 p-2 cursor-pointer ${
                highlighted ? 'bg-gray-100' : ''
            }`}
            onClick={onClick}
        >
            <div className="flex flex-row justify-around">
                {renga.emojis.map((emoji, index) => (
                    <div className="pr-1 last:pr-0">
                        <Emoji size={32} native emoji={emoji} key={index} />
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center text-center text-gray-700 text-xs">
                Posted by {renga.isMine ? 'You' : renga.author.username}{' '}
                {moment(renga.createdAt).fromNow()}
            </div>
        </div>
    )
}

type Props = {
    renga: Pick<RengaType, 'id' | 'emojis' | 'createdAt' | 'isMine'> & {
        author: { __typename?: 'User' } & Pick<User, 'id' | 'username'>
    }
    highlighted: boolean
    onClick: () => void
}

export default Renga
