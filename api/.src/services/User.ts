import { PrismaClient } from '@prisma/client'

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
