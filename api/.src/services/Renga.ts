import { PrismaClient } from '@prisma/client'

interface SolvedRengas {
    id: number
    title: string
    successRatio: number
    totalcount: number
}

export const populateRengas = async (
    client: PrismaClient,
    {
        partyId,
        count,
        minSuccessRatio,
        minAttemptsCount,
        userBotId,
    }: {
        partyId: string
        count: number
        minSuccessRatio: number
        minAttemptsCount: number
        userBotId: number
    }
) => {
    const res = await client.raw<SolvedRengas[]>`
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
        ORDER BY RANDOM()
        ) s
  ) t
  WHERE rank = 1 -- take the most popular movie
  LIMIT ${count};`

    const rengaIds = res.map((x) => x.id)

    const rengas = await client.renga.findMany({
        include: { movie: true },
        where: { id: { in: rengaIds } },
    })

    const promises = rengas.map(async (renga) => {
        return client.renga.create({
            data: {
                party: { connect: { id: partyId } },
                author: { connect: { id: userBotId } },
                emojis: { set: renga.emojis },
                movie: { connect: { id: renga.movieId } },
            },
        })
    })
    return Promise.all(promises)
}
