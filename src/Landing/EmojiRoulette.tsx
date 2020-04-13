import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

const RENGAS = [
    ['👽', '📞', '🏠'],
    ['👴', '👨', '👶'],
    ['😱', '😱', '😱'],
    ['🇺🇸', '🍎', '🥧'],
    ['🍝', '🙏', '♥️'],
    ['🗽', '🎒', '👻'],
    ['🤠', '👨‍🚀', '🦖'],
    ['👦', '🎟️', '🍫'],
    ['🤴', '🎙️', '🇬🇧'],
]

const EmojiRoulette = () => {
    const [cursor, setCursor] = useState(0)
    const controls = useAnimation()
    const renga = RENGAS[cursor]
    useEffect(() => {
        let index = cursor
        setInterval(async () => {
            await controls.start((i) => ({
                y: 100,
                opacity: 0,
                transition: { duration: 0.3, delay: i * 0.1 },
            }))
            index = index === RENGAS.length - 1 ? 0 : index + 1
            setCursor(index)
            await controls.start((i) => ({
                y: -100,
                opacity: 0,
                transition: { duration: 0 },
            }))
            await controls.start((i) => ({
                y: 0,
                opacity: 1,
                transition: { duration: 0.3, delay: i * 0.1 },
            }))
        }, 3000)
    }, [])
    return (
        <div className="flex justify-center text-5xl my-8">
            <div
                className="bg-white flex justify-center overflow-hidden mr-4 rounded-xl items-center"
                style={{ width: 85, height: 85 }}
            >
                <motion.div animate={controls} custom={0}>
                    {renga[0]}
                </motion.div>
            </div>
            <div
                className="bg-white flex justify-center overflow-hidden mr-4 rounded-xl items-center"
                style={{ width: 85, height: 85 }}
            >
                <motion.div animate={controls} custom={1}>
                    {renga[1]}
                </motion.div>
            </div>
            <div
                className="bg-white flex justify-center overflow-hidden mr-4 rounded-xl items-center"
                style={{ width: 85, height: 85 }}
            >
                <motion.div animate={controls} custom={2}>
                    {renga[2]}
                </motion.div>
            </div>
        </div>
    )
}
export default EmojiRoulette
