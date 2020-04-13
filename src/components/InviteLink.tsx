import classNames from 'classnames'
import copy from 'copy-to-clipboard'
import * as React from 'react'

export interface InviteLinkProps {
    className?: string
    partyId: string
}

export default ({ className }: InviteLinkProps) => {
    const [isCopied, setIsCopied] = React.useState(false)
    const onClickCopy = React.useCallback(() => {
        copy(`${window.location.href}`)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }, [setIsCopied])
    return (
        <div
            className={`${classNames(
                className
            )} text-sm text-gray-600 flex sm:items-center flex-col sm:flex-row items-start`}
        >
            <div>Party link:</div>
            <div className="flex justify-center items-center py-2">
                <div
                    className="cursor-pointer sm:mx-4 sm:mt-0 text-gray-500 py-1 px-2 rounded-md border-gray-200 border-2"
                    onClick={() => onClickCopy()}
                >
                    {window.location.href}
                </div>
                <span className="text-gray-400 text-sm ml-1">
                    {isCopied && 'Copied!'}
                </span>
            </div>
        </div>
    )
}
