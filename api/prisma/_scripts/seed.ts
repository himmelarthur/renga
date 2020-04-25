import { PrismaClient } from '@prisma/client'
import logging from '../../.src/logging'
import { truncate } from 'fs'
const client = new PrismaClient()

async function main() {
    try {
        logging.info('Seed start')
        await client.party.create({
            data: {
                id: 'party-1',
            },
        })
        const userPromises = [0, 1, 2, 3, 4].map(async (index) => {
            return client.user.create({
                include: {
                    rengas: true,
                },
                data: {
                    username: `player-${index}`,
                    score: Math.floor(Math.random() * 100),
                    party: { connect: { id: 'party-1' } },
                    rengas: {
                        create: [
                            {
                                movie: {
                                    create: {
                                        movieDBId: index * 10,
                                        title: `Film-${index}`,
                                        year: 2014,
                                        genres: { set: [14, 36] },
                                    },
                                },
                                party: { connect: { id: 'party-1' } },
                                emojis: { set: ['grin', 'santa', 'smile'] },
                            },
                            {
                                movie: {
                                    create: {
                                        movieDBId: index * 10 + 1,
                                        title: `Film-${index}`,
                                        year: 208,
                                        genres: { set: [80, 99] },
                                    },
                                },
                                party: { connect: { id: 'party-1' } },
                                emojis: { set: ['grin', 'santa', 'smile'] },
                            },
                        ],
                    },
                },
            })
        })

        await Promise.all(userPromises)

        const submissionPromises = [1, 2, 3].map(async (index) => {
            const user = await userPromises[index]
            return client.submission.create({
                data: {
                    author: { connect: { id: user.id } },
                    movieTitle: `Foo-${index}`,
                    movieDBId: index * 10,
                    valid: false,
                    renga: { connect: { id: user.rengas[0].id } },
                },
            })
        })

        await Promise.all(submissionPromises)
        logging.info('Seed terminated')
    } catch (err) {
        logging.error(err)
    }
}

main().finally(async () => {
    await client.disconnect()
})
