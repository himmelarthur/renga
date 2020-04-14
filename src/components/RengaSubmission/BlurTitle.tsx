import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

export interface BlurTitleProps {
    className?: string
    rengaId: number
    title: string
}

export default ({ className, title, rengaId }: BlurTitleProps) => {
    const [isShown, setIsShow] = useState(false)
    useEffect(() => {
        setIsShow(false)
    }, [rengaId])
    return (
        <div className={classNames("flex flex-col items-center p-4", className)}>
            <div
                className={classNames(
                    ' transition-all duration-200',
                    'text-3xl font-bold text-center text-gray-900',
                    { 'blur-1': !isShown }
                )}
            >
                {title}
            </div>
            <div className="text-sm uppercase text-teal-800 mt-2 cursor-pointer " onClick={() => setIsShow(!isShown)}>{isShown ? 'hide' : 'show'}</div>
        </div>
    )
}
