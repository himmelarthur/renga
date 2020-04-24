import logger from '../logging'

// TODO ENGLISH
const MOVIEDB_GENRES: { [i: number]: string } = {
    28: 'Action',
    12: 'Aventure',
    16: 'Animation',
    35: 'Comédie',
    80: 'Crime',
    99: 'Documentaire',
    18: 'Drame',
    10751: 'Familial',
    14: 'Fantastique',
    36: 'Histoire',
    27: 'Horreur',
    10402: 'Musique',
    9648: 'Mystère',
    10749: 'Romance',
    878: 'Science-Fiction',
    10770: 'Téléfilm',
    53: 'Thriller',
    10752: 'Guerre',
    37: 'Western',
}

export const getMovieGenre = (id: number | string) => {
    try {
        // TODO CHANGE
        const iid = Number(id)
        return MOVIEDB_GENRES[iid]
    } catch {
        logger.warn(`${id} genre not found`)
        return ''
    }
}
