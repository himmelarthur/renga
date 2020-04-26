import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import TextButton from '../TextButton'

export interface BlurTitleProps {
    className?: string
    rengaId: number
    title: string
}

export default ({ className, title, rengaId }: BlurTitleProps) => {
    const [isShown, setIsShown] = useState(false)
    useEffect(() => {
        setIsShown(false)
    }, [rengaId])
    return (
        <div className={classNames('flex flex-col items-center', className)}>
            <div
                onClick={() => setIsShown(!isShown)}
                className={classNames(
                    'transition-all duration-200',
                    'text-xl sm:text-3xl font-bold text-center text-gray-900 cursor-pointer',
                    { 'blur-1': !isShown }
                )}
            >
                {title}
            </div>
            <TextButton
                onClick={() => setIsShown(!isShown)}
                color="teal"
                className="text-xs mt-2"
            >
                {isShown ? 'hide' : 'show'}
            </TextButton>
        </div>
    )
}
