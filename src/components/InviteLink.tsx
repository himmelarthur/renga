import * as React from 'react'
import classNames from 'classnames'
import { useGetInvitationLinkLazyQuery } from '../generated/graphql'
import gql from 'graphql-tag'
import copy from 'copy-to-clipboard'

export interface InviteLinkProps {
    className?: string
    partyId: string
}

gql`
    query getInvitationLink($partyId: String!) {
        invitePartyLink(partyId: $partyId)
    }
`

export default ({ className, partyId }: InviteLinkProps) => {
    const [isCopied, setIsCopied] = React.useState(false)
    const [getInviteLink] = useGetInvitationLinkLazyQuery({
        variables: { partyId },
        onCompleted: (data) =>
            setIsCopied(
                copy(`${window.location.origin}/${data.invitePartyLink}`)
            ),
    })
    return (
        <div className={classNames(className)}>
            <span className="cursor-pointer text-gray-700 font-bold" onClick={() => getInviteLink()}>
                🔗 Invite link
            </span>
            <span className="text-gray-400 text-sm ml-1">{isCopied && 'Copied!'}</span>
        </div>
    )
}
