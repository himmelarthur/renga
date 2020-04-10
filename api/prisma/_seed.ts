import { PrismaClient } from '@prisma/client'
import logging from '../.src/logging'
const client = new PrismaClient()

async function main() {
    try {
        logging.info('Seed start')
        const futures = [0, 1, 2, 3, 4].map(async (i) => {
            await client.user.create({
                data: {
                    username: `player-${i}`,
                },
            })
        })
        await Promise.all(futures)
        logging.info('Seed terminated')
    } catch (err) {}
}

main().finally(async () => {
    await client.disconnect()
})
