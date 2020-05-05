import React, { useRef, useLayoutEffect } from 'react'
import { Renga as RengaType, User, Status } from '../../generated/graphql'
import classNames from 'classnames'
import RengaSubmission from '../RengaSubmission'
import RengaItem from './RengaItem'
import { useParty } from '../../Party/hooks'

const Renga = ({ open, renga, onClick, onClose, onSolved }: Props) => {
    const { partyId, player } = useParty()
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
            className={classNames('flex flex-col justify-center items-center', {
                'w-full': open,
            })}
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
                    userId={player!.userId}
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
