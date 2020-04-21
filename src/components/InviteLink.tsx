import classNames from 'classnames'
import copy from 'copy-to-clipboard'
import * as React from 'react'

export interface InviteLinkProps {
    className?: string
    partyId: string
}

export default ({ className, partyId }: InviteLinkProps) => {
    const [isCopied, setIsCopied] = React.useState(false)
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
            className={`${classNames(
                className
            )} text-xs sm:text-sm text-gray-600 flex items-center flex-row`}
        >
            <div className="">Invite friends:</div>
            <div className="flex justify-center items-center py-2 ml-1">
                <div
                    className="cursor-pointer sm:mx-4 sm:mt-0 py-1 px-2 sm:px-4 rounded border truncate"
                    onClick={() => onClickCopy()}
                >
                    {`${window.location.origin}/p/${partyId}`}
                </div>
                <span className="text-gray-400 text-sm ml-1">
                    {isCopied && 'Copied!'}
                </span>
            </div>
        </div>
    )
}
