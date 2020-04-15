import React from 'react'
import { BaseEmoji, Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

type OptionalBaseEmoji = BaseEmoji | undefined
export type TBricks = [OptionalBaseEmoji, OptionalBaseEmoji, OptionalBaseEmoji]

interface Props {
    emojis: TBricks
    onEmojisChange: (bricks: TBricks) => void
}

const EmojiSelector: React.FC<Props> = ({ emojis, onEmojisChange }) => {
    
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full flex items-center justify-center">
                <div className="flex flex-col items-center my-3 group">
                    <div className="flex relative">
                        {emojis.map((emoji, index) => (
                            <div
                                className="bg-white rounded-lg mx-2 sm:h-16 sm:w-16 h-12 w-12 text-4xl sm:text-5xl text-center cursor-pointer"
                                key={index}
                                onClick={() => {
                                    const newEmojis = emojis.filter((_, i) => index !== i)
                                    onEmojisChange([newEmojis[0], newEmojis[1], undefined])
                                }}
                            >
                                {emoji && emoji.native}
                            </div>
                        ))}
                    {!!emojis.filter((emoji) => emoji).length && (
                        <div
                            className="absolute uppercase cursor-pointer text-red-500 font-bold items-center h-full mr-4 flex"
                            style={{ right: '-70px' }}
                            onClick={() =>
                                onEmojisChange([
                                    undefined,
                                    undefined,
                                    undefined,
                                ])
                            }
                        >
                            Clear
                        </div>
                    )}
                    </div>
                    <div className='mt-1 text-gray-500 text-xs invisible group-hover:visible'>Click to remove one emoji</div>

                </div>
            </div>
            <Picker
                title={''}
                onSelect={(emoji: BaseEmoji) => {
                    switch (undefined) {
                        case emojis[0]:
                            onEmojisChange([emoji, emojis[1], emojis[2]])
                            break
                        case emojis[1]:
                            onEmojisChange([emojis[0], emoji, emojis[2]])
                            break
                        case emojis[2]:
                            onEmojisChange([emojis[0], emojis[1], emoji])
                            break
                        default:
                            break
                    }
                }}
            />
        </div>
    )
}

export default EmojiSelector
