import classNames from 'classnames'
import React, { FormEvent } from 'react'
import Loader from 'react-loader-spinner'

type Props = {
    disabled?: boolean
    children: JSX.Element | JSX.Element[] | string
    loading?: boolean
    onClick: (e: FormEvent) => any
    className?: string
}

const Button = ({ loading, children, className, ...props }: Props) => {
    const disabled = props.disabled || loading
    return (
        <button
            disabled={disabled}
            className={classNames(
                `w-full text-white py-2 px-4 rounded text-xl font-medium outline-none transition duration-150 relative flex items-center justify-center`,
                {
                    'cursor-default': disabled,
                    'bg-gray-300': disabled,
                    'hover:opacity-75': !disabled,
                },
                className
            )}
            style={{
                background: props.disabled
                    ? ''
                    : 'linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%)',
            }}
            {...props}
        >
            {loading ? (
                <div className="absolute">
                    <Loader
                        color="white"
                        type="TailSpin"
                        height={24}
                        width={24}
                    ></Loader>
                </div>
            ) : undefined}
            <div className={classNames({ invisible: loading })}>{children}</div>
        </button>
    )
}

export default Button
