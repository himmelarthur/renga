import classNames from 'classnames'
import copy from 'copy-to-clipboard'
import * as React from 'react'

export interface InviteLinkProps {
    className?: string
    partyId: string
}

export default ({ className }: InviteLinkProps) => {
    const [isCopied, setIsCopied] = React.useState(false)
    return (
        <div className={classNames(className)}>
            <span
                role="img"
                aria-label=""
          className="cursor-pointer text-gray-700 font-bold"
                onClick={() => setIsCopied(copy(`${window.location.href}`))}
            >
                🔗 Invite link
            </span>
            <span className="text-gray-400 text-sm ml-1">
                {isCopied && 'Copied!'}
            </span>
        </div>
    )
}
