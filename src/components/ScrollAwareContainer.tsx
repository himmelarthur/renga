import React, {
    useEffect,
    useRef,
    ReactNode,
    DetailedHTMLProps,
    HTMLAttributes,
    useState,
} from 'react'

const ScrollAwareContainer = ({
    children,
    scrollKey,
    onScrollPast,
    offset = 0,
    ...other
}: Props) => {
    const [usedKeys, setUsedKeys] = useState<{ [key: string]: boolean }>({})
    useEffect(() => {
        const trackScrolling = () => {
            if (
                !usedKeys[scrollKey] &&
                containerRef.current &&
                window.innerHeight + offset >=
                    containerRef.current.getBoundingClientRect().bottom
            ) {
                onScrollPast()
                setUsedKeys({ ...usedKeys, [scrollKey]: true })
            }
        }
        document.addEventListener('scroll', trackScrolling)
        return () => document.removeEventListener('scroll', trackScrolling)
    }, [usedKeys, scrollKey])
    const containerRef = useRef<HTMLDivElement>(null)
    return (
        <div {...other} ref={containerRef}>
            {children}
        </div>
    )
}

type Props = {
    children: ReactNode
    offset?: number
    scrollKey: string
    onScrollPast: () => any
} & Partial<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>

export default ScrollAwareContainer
