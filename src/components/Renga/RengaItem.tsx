import { Emoji } from 'emoji-mart'
import moment from 'moment'
import React from 'react'
import { Renga as RengaType, Status, User } from '../../generated/graphql'
import classNames from 'classnames'

const RengaItem = ({ renga }: Props) => {
    return (
        <div
            className={classNames(
                'sm:w-40 w-32 hover:bg-gray-200 cursor-pointer px-2 py-4 mr-4 mb-4 rounded ',
                {
                    'grayed opacity-75': renga.status.isResolved,
                }
            )}
        >
            <div>{renga.id}</div>
            <div className="flex flex-row justify-center space-x-2">
                {renga.emojis.map((emoji, index) => (
                    <div key={index.toString()}>
                        <Emoji
                            size={32}
                            native={false}
                            emoji={emoji}
                            key={index}
                        />
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-center justify-center text-gray-700 text-xs w-full">
                <div className="flex w-full justify-center">
                    <span className="flex-shrink-0">Posted by </span>
                    <span className="font-semibold ml-1 truncate">
                        {renga.status.isMine ? ' You' : renga.author.username}
                    </span>
                </div>

                <div className="text-gray-600">
                    {moment(renga.createdAt).fromNow()}
                </div>
            </div>
        </div>
    )
}

type Props = {
    renga: Pick<RengaType, 'id' | 'emojis' | 'createdAt'> & {
        author: { __typename?: 'User' } & Pick<User, 'id' | 'username'>
    } & {
        status: { __typename?: 'Status' } & Pick<
            Status,
            'isMine' | 'isResolved'
        >
    }
}

export default RengaItem
