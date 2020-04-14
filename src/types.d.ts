declare module 'confetti-js' {
    interface IConfettiSettings {
        target: string
        max: string
        size: string
        animate: boolean
        props: string[]
        colors: [number, number, number][]
        clock: string
        rotate: boolean
    }

    export default class ConfettiGenerator implements IConfettiGenerator {
        constructor(settings: IConfettiSettings) {}
        render: () => void
        clear: () => void
    }
}

interface Crisp {
    push: (arg: [string, string, any[]]) => void
}

interface Window {
    $crisp?: Crisp
}
