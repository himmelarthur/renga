import { PrismaClient } from '@prisma/client'
import { AuthenticatedAccount } from '../security/account_auth'
import logger from '../logging'

export const incrementHintCount = async (
    client: PrismaClient,
    { userId, isFirstSolved }: { userId: number; isFirstSolved: boolean }
) => {
    const user = await client.user.findOne({
        select: { id: true, hintCount: true },
        where: { id: userId },
    })
    if (!user) throw Error('User not found')

    if (isFirstSolved) {
        return client.user.update({
            where: { id: userId },
            data: { hintCount: user.hintCount + 1 },
        })
    } else {
        return user
    }
}

export const incrementScore = async (
    client: PrismaClient,
    { userId, isFirstSolved }: { userId: number; isFirstSolved: boolean }
) => {
    const user = await client.user.findOne({
        where: { id: userId },
    })
    if (!user) throw Error('User not found')

    const points = isFirstSolved ? 2 : 1

    return client.user.update({
        where: { id: userId },
        data: { score: user.score + points },
    })
}

export const isAccountOwner = async (
    client: PrismaClient,
    authorId: number,
    account: Promise<AuthenticatedAccount>
) => {
    const auth0Id = (await account)?.auth0Id
    if (!auth0Id) return false

    const author = await client.user.findOne({
        select: { id: true, account: true },
        where: { id: authorId },
    })

    if (!author?.account?.auth0id) return false
    return author?.account?.auth0id === auth0Id
}
