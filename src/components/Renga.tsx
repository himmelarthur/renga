import React from 'react'
import { Renga as RengaType, User } from '../generated/graphql'
import { Emoji } from 'emoji-mart'
import moment from 'moment'

const Renga = ({ renga }: Props) => (
    <div>
        {renga.emojis.map((emoji) => (
            <Emoji size={32} native emoji={emoji} />
        ))}
        <div>
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
