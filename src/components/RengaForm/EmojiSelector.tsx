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
                <div className="flex my-4">
                    {emojis.map((emoji, index) => (
                        <div
                            className="bg-gray-400 rounded mx-2 h-16 w-16 text-5xl text-center"
                            key={index}
                        >
                            {emoji && emoji.native}
                        </div>
                    ))}
                </div>
                {!!emojis.filter((emoji) => emoji).length && (
                    <div
                        className="absolute uppercase right-0 cursor-pointer text-red-700 font-bold"
                        onClick={() =>
                            onEmojisChange([undefined, undefined, undefined])
                        }
                    >
                        Clear
                    </div>
                )}
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
