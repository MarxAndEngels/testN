import scrollTo from 'vue-scrollto'

export const scrollToElement = (elementId: string, timeout?: number, duration?: number, offset?: number) => {
    let options = {
        duration: duration ? duration : 0,
        offset: offset ? offset : -38,
        force: true,
        container: 'body'
    }
    setTimeout(() => {
        scrollTo.scrollTo(elementId, options)
    }, timeout ? timeout : 25)
}