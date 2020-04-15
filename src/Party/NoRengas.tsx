import React from 'react'
import Button from '../components/Button'

const MOVIES = [
    { title: 'Psycho', emojis: ['🚿', '🔪', '😱'] },
    { title: 'Eat Pray Love', emojis: ['🍽', '🙏', '❤️'] },
    {
        title: 'The Curious Case of Benjamin Button',
        emojis: ['👴', '👨', '👶'],
    },
    { title: 'Inception', emojis: ['💤', '💤', '💍'] },
    { title: 'The Godfather', emojis: ['🐴', '🙍‍♀️', '🛌'] },
    {
        title: 'Harry Potter and the Goblet of Fire',
        emojis: ['⚡️', '🧙‍♀️', '🐉'],
    },
    { title: 'Joker', emojis: ['🃏', '📺', '🔫'] },
]

type Props = {
    onClickNew: () => void
}

const NoRengas = ({ onClickNew }: Props) => {
    const movie = MOVIES[Math.floor(Math.random() * MOVIES.length)]
    return (
        <div className="flex flex-col w-full bg-gray-100 p-4 px-6 text-gray-900">
            <div>
                <div className="mb-6">
                    <div className="font-medium mb-2 text-lg">
                        <span className="text-primary">Rengas</span> are groups
                        of <span className="text-primary">three emojis</span>{' '}
                        that depict a movie
                    </div>
                    <div className="font-medium mb-2  text-lg">
                        Create Rengas and solve your friends’ Rengas to gain
                        points!
                    </div>
                </div>
                <div className="justify-center flex my-4">
                    <Button className="sm:w-auto" onClick={onClickNew}>
                        New Renga
                    </Button>
                </div>
                <div className="">
                    <div className="mb-4 font-bold mt-2 text-lg">
                        Need some inspiration?
                    </div>
                    <div className="justify-center mt-6">
                        <div className="text-center text-primary font-medium text-lg">
                            {movie.title}
                        </div>
                        <div className="flex justify-center mt-4">
                            {movie.emojis.map((emoji) => (
                                <div className="bg-white w-16 h-16 items-center justify-center flex rounded-lg mx-2 text-4xl">
                                    {emoji}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoRengas
