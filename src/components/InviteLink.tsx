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
    }, [setIsCopied])
    return (
        <div
            onClick={() => onClickCopy()}
            className={`${classNames(
                className,
                'text-sm text-gray-700 flex items-center justify-center flex-row items-start py-2 group'
            )}`}
        >
            <div className="group-hover:hidden text-center">Invite friends</div>
            <div className="justify-center items-center hidden group-hover:flex">
                <span className="text-gray-400 text-sm hidden group-hover:inline mr-2">
                    {isCopied ? 'Copied!' : 'Click to copy'}
                </span>
                <input
                    readOnly
                    type="text"
                    className="appearance-none focus:outline-none focus:shadow-outline w-56 px-2"
                    value={`${window.location.origin}/p/${partyId}`}
                />
            </div>
        </div>
    )
}
