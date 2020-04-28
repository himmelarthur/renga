import classNames from 'classnames'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import TextButton from '../components/TextButton'
import { track } from '../utils/tracking'

const useFirstVisit = () => {
    const [alreadyVisited, setAlreadyVisited] = useState(true)
    useEffect(() => {
        const hasAlreadyVisit = !!localStorage.getItem('alreadyVisited')
        setAlreadyVisited(hasAlreadyVisit)
        if (!hasAlreadyVisit) {
            localStorage.setItem('alreadyVisited', moment().toString())
        }
    }, [])
    return { alreadyVisited }
}

const WelcomeMessage = ({ className }: { className?: string }) => {
    const { alreadyVisited } = useFirstVisit()
    const [shown, setIsShown] = useState(!alreadyVisited)
    useEffect(() => {
        setIsShown(!alreadyVisited)
    }, [alreadyVisited])

    return (
        <div
            className={classNames(
                'bg-green-100 p-4 px-6 text-gray-700 relative rounded',
                className,
                {
                    hidden: !shown,
                    'flex flex-col items-end': shown,
                }
            )}
        >
            <div className="">
                <span className="text-primary">Rengas</span> are groups of{' '}
                <span className="text-primary">three emojis</span> that depict a
                movie. Create Rengas and solve your friends’ Rengas to gain
                points!
            </div>
            <TextButton
                className="sm:absolute right-0 bottom-0 sm:p-3 text-sm"
                color="teal"
                onClick={() => {
                    track('Cliked Close Welcome Message')
                    setIsShown(false)
                }}
            >
                Close
            </TextButton>
        </div>
    )
}

export default WelcomeMessage
