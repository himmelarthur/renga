export const track = (event: string, args?: {}) => {
    window.heap?.track(event, args)
}
