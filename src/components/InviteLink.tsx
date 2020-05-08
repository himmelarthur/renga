import classNames from 'classnames'
import copy from 'copy-to-clipboard'
import * as React from 'react'
import ReactModal from 'react-modal'
import TextButton from './TextButton'

export interface InviteLinkProps {
    className?: string
    partyId: string
}

export default ({ className, partyId }: InviteLinkProps) => {
    const [isCopied, setIsCopied] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const onClickCopy = React.useCallback(() => {
        copy(`${window.location.href}`)
        setIsCopied(true)
        window.heap?.track('Copy invitation', {
            partyId,
        })
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }, [setIsCopied, partyId])
    return (
        <div
            className={classNames(
                'text-xs sm:text-sm text-gray-600 flex items-center flex-row',
                className
            )}
        >
            <TextButton
                color="gray"
                className="uppercase cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                Invite friends
            </TextButton>
            <ReactModal
                ariaHideApp={false}
                onRequestClose={() => setIsOpen(false)}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                isOpen={isOpen}
                style={{
                    overlay: {
                        height: '260px',
                        top: '100px',
                        bottom: '',
                    },
                    content: {
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        width: 'max-content',
                    },
                }}
            >
                <div className="flex flex-col justify-between items-center py-2 ml-1 h-full text-gray-800">
                    <span className="font-medium text-primary text-xl">
                        Invite link{' '}
                        <span className="text-gray-400 text-sm ml-1">
                            {isCopied && 'Copied!'}
                        </span>
                    </span>
                    <div
                        className="cursor-pointer sm:mx-4 sm:mt-0 py-1 px-2 sm:px-4 rounded border truncate"
                        onClick={() => onClickCopy()}
                    >
                        {`${window.location.origin}/p/${partyId}`}
                    </div>

                    <div
                        className="uppercase cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        Close
                    </div>
                </div>
            </ReactModal>
        </div>
    )
}
