import React, { useRef, useLayoutEffect } from 'react'
import { Renga as RengaType, User, Status } from '../../generated/graphql'
import classNames from 'classnames'
import RengaSubmission from '../RengaSubmission'
import RengaItem from './RengaItem'
import { useParty } from '../../hooks'

const Renga = ({ open, renga, onClick, onClose, onSolved }: Props) => {
    const { partyId, user } = useParty()
    const ref = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        if (open && ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }
    }, [open])
    return (
        <div
            ref={ref}
            className={classNames(
                'flex flex-col justify-center items-center mr-4 mb-4 rounded p-2 w-full',
                {
                    'bg-gray-100': open,
                    'grayed opacity-75': renga.status.isResolved && !open,
                    'w-full': open,
                    'w-32 sm:w-40 h-24 hover:bg-gray-200  cursor-pointer': !open,
                }
            )}
            onClick={
                open
                    ? undefined
                    : () => {
                          onClick()
                          setTimeout(() => {
                              if (ref.current) {
                                  ref.current.scrollIntoView({
                                      behavior: 'smooth',
                                      block: 'center',
                                  })
                              }
                          }, 0)
                      }
            }
        >
            {open ? (
                <RengaSubmission
                    rengaId={renga.id}
                    partyId={partyId!}
                    userId={user!.userId}
                    onClose={onClose}
                    onSolved={onSolved}
                />
            ) : (
                <RengaItem renga={renga} />
            )}
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
    open: boolean
    onClick: () => void
    onClose: () => void
    onSolved: () => void
}

export default Renga
