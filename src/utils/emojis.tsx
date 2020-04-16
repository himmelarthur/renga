import emojis from 'emoji-mart/data/all.json'

const hashCode = (s: string) =>
    s.split('').reduce((a: number, b: string) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
    }, 0)

const NATURE_EMOJIS = Object.values(emojis.categories[1].emojis)

// Deterministically Assigns a random emoji to a user
export const userEmoji = (partyId: string, userId: number) => {
    const userHash =
        Math.abs(hashCode(`${userId}-${partyId}`)) % NATURE_EMOJIS.length
    return NATURE_EMOJIS[userHash]
}
