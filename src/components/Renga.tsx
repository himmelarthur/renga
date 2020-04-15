import React from 'react'
import { Renga as RengaType, User, Status } from '../generated/graphql'
import { Emoji } from 'emoji-mart'
import moment from 'moment'
import classNames from 'classnames'

const Renga = ({ renga, highlighted, onClick }: Props) => {
    return (
        <div
            className={classNames(
                'flex flex-col justify-center items-center sm:w-40 w-32 h-24 mr-4 mb-4 rounded hover:bg-gray-200 p-2 cursor-pointer',
                {
                    'bg-gray-100': highlighted,
                    'grayed opacity-75': renga.status.isResolved,
                }
            )}
            onClick={onClick}
        >
            <div className="flex flex-row justify-around">
                {renga.emojis.map((emoji, index) => (
                    <div className="pr-1 last:pr-0">
                        <Emoji size={32} native emoji={emoji} key={index} />
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-center justify-center  text-gray-700 text-xs">
                <div className="flex">
                    <span>Posted by </span>
                    <span className="font-semibold ml-1">
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
    highlighted: boolean
    onClick: () => void
}

export default Renga
