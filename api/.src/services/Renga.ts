import { PrismaClient } from '@prisma/client'

interface SolvedRengas {
    id: number
    title: string
    successRatio: number
    totalcount: number
}

const BOT_NAME = '🤖 RengaBot'
const BOT_PARTY = 'admin-auto-party-1'

export const populateRengas = async (
    client: PrismaClient,
    {
        partyId,
        count,
        minSuccessRatio,
        minAttemptsCount,
    }: {
        partyId: string
        count: number
        minSuccessRatio: number
        minAttemptsCount: number
    }
) => {
    const botPromise = createBotIfNotExist(client)

    const popularRengaIds = await client.raw<SolvedRengas[]>`
  SELECT id,
         title,
         totalcount,
         successRatio
  FROM (
    SELECT id,
            title,
            successRatio,
            totalcount,
            movieId,
            rank() OVER (PARTITION BY movieId
                         ORDER BY s.totalcount DESC) AS rank
        FROM (
            SELECT r."id" AS id,
                m."movieDBId" AS movieId,
                m."title" AS title,
                (count(1) filter (WHERE VALID = TRUE))::float/count(1) AS successRatio,
                count(1) AS totalcount
        FROM "Renga" r
        JOIN "Submission" s ON r."id" = s."rengaId"
        JOIN "Movie" m ON r."movieId" = m."id"
        GROUP BY 1, 2, 3
        HAVING (count(1) filter (WHERE VALID = TRUE))::float/count(1) > ${minSuccessRatio}
        AND count(1) > ${minAttemptsCount}
        ) s
  ) t
  WHERE rank = 1 -- take the most popular renga
  ORDER BY RANDOM()
  LIMIT ${count};`

    const rengaIds = popularRengaIds.map((x) => x.id)

    const rengasPromise = client.renga.findMany({
        include: { movie: true },
        where: { id: { in: rengaIds } },
    })

    const [rengas, bot] = await Promise.all([rengasPromise, botPromise])

    if (!rengas) return Promise.reject('No popular rengas')
    if (!bot) return Promise.reject('No bot to create rengas')

    const promises = rengas.map(async (renga) => {
        return client.renga.create({
            data: {
                party: { connect: { id: partyId } },
                author: { connect: { id: bot.id } },
                emojis: { set: renga.emojis },
                movie: { connect: { id: renga.movieId } },
            },
        })
    })
    return Promise.all(promises)
}

const createBotIfNotExist = async (client: PrismaClient) => {
    const bots = await client.user.findMany({
        where: { username: BOT_NAME, partyId: BOT_PARTY },
    })
    if (!bots.length) {
        return client.user.create({
            data: {
                party: { create: { id: BOT_PARTY } },
                username: BOT_NAME,
            },
        })
    } else {
        return bots[0]
    }
}

export const incrementRenga = async (
    client: PrismaClient,
    {
        rengaId,
        previousSubmissions,
        isSolved,
    }: {
        rengaId: number
        previousSubmissions: Array<{ valid: boolean }>
        isSolved: boolean
    }
) => {
    const attemptCount = previousSubmissions.length + 1
    const solverCount =
        previousSubmissions.filter((x) => x.valid).length + +isSolved
    const successRatio = solverCount / attemptCount

    return client.renga.update({
        where: { id: rengaId },
        data: {
            attemptCount,
            solverCount,
            successRatio,
        },
    })
}
