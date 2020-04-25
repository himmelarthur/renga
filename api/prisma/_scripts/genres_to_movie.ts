import { PrismaClient } from '@prisma/client'
import logging from '../../.src/logging'
import fetch from 'node-fetch'
import logger from '../../.src/logging'

const client = new PrismaClient()

export interface MovieResult {
    id: number
    genres: Array<{ id: number }>
}

const api_key = ''

async function main() {
    try {
        logging.info('Script start')
        const movies = await client.movie.findMany({
            select: { movieDBId: true, genres: true },
        })
        logger.info(movies)
        const movieDBIds = Array.from(
            new Set(
                movies
                    .filter((x) => x.genres.length === 0)
                    .map((x) => x.movieDBId)
            )
        )

        const promises = movieDBIds.map(async (e) => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${e}?api_key=${api_key}&language=en-US`
                )
                const body: MovieResult = await res.json()
                const genre_ids: number[] = body.genres.map((x) => x.id)
                const id = Number(e)
                logging.info(`${id} update movies`)
                await client.movie.updateMany({
                    data: { genres: { set: genre_ids } },
                    where: { movieDBId: id },
                })
            } catch (err) {
                logger.error(`Error with ${e} : ${err}`)
            }
        })

        await Promise.all(promises)
        logging.info('Script terminated')
    } catch (err) {
        logging.error(err)
    }
}

main().finally(async () => {
    await client.disconnect()
})
