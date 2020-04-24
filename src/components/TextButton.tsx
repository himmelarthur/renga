import React from 'react'
import classNames from 'classnames'

const TextButton = ({ onClick, color, className, children }: Props) => {
    return (
        <div
            className={classNames(
                'uppercase cursor-pointer font-medium',
                `text-${color}-500 hover:text-${color}-700`,
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
type Props = {
    color: string
    className?: string | {}
    onClick: () => any
    children: string
}
export default TextButton
