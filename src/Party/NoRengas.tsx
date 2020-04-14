import React from 'react'

const MOVIES = [
    { title: 'Psycho', emojis: '🚿🔪😱' },
    { title: 'Eat Pray Love', emojis: '🍽🙏❤️' },
    { title: 'The Curious Case of Benjamin Button', emojis: '👴👨👶' },
    { title: 'Inception', emojis: '💤💤💍' },
    { title: 'The Godfather', emojis: '🐴🙍‍♀️🛌' },
    { title: 'Harry Potter and the Goblet of Fire', emojis: '⚡️🧙‍♀️🐉' },
    { title: 'Joker', emojis: '🃏📺🔫' },
]

const NoRengas = () => {
    const movie = MOVIES[Math.floor(Math.random() * MOVIES.length)]
    return (
        <div className="flex flex-col items-center w-full">
            <div className="text-3xl">🕵️‍♀️</div>
            <div className="text-2xl text-gray-700">
                There are no Rengas yet.
            </div>
            <div className="text-gray-700 text-lg">
                Can't think of a movie? Here is some inspiration:
            </div>
            <div className="text-center mt-4">
                <div className="text-primary font-medium text-3xl">
                    {movie.title}
                </div>
                <div className="text-6xl tracking-widest">{movie.emojis}</div>
            </div>
        </div>
    )
}

export default NoRengas
