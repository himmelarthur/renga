import React, {
    DetailedHTMLProps,
    ButtonHTMLAttributes,
    FormEvent,
} from 'react'
import Loader from 'react-loader-spinner'

type Props = {
    disabled?: boolean
    children: JSX.Element | JSX.Element[] | string
    loading?: boolean
    onClick: (e: FormEvent) => any
}

const Button = ({ loading, children, ...props }: Props) => {
    const disabled = props.disabled || loading
    return (
        <button
            disabled={disabled}
            className={`w-full sm:w-auto text-white py-2 px-4 rounded text-xl font-medium mt-4 sm:mt-0 ${
                disabled ? '' : 'hover:opacity-75'
            } relative flex items-center justify-center ${
                disabled ? 'cursor-default' : ''
            }`}
            style={{
                background: 'linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%)',
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
            <div className={`${loading ? 'invisible' : ''}`}>{children}</div>
        </button>
    )
}

export default Button