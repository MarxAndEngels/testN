export default defineEventHandler((event) => {
    const urlObj = getRequestURL(event)

    // don't touch error routes
    if (urlObj.pathname === '/__nuxt_error') return
    if (urlObj.pathname.match(/[A-Z]/)) {
        urlObj.pathname = urlObj.pathname.toLowerCase()
        sendRedirect(event, urlObj.href)
    }

    if (urlObj.pathname !== '/' && urlObj.pathname.indexOf('.') == -1 && urlObj.pathname.endsWith('/')) {
        urlObj.pathname = urlObj.pathname.slice(0, -1)
        sendRedirect(event, urlObj.href)
    }
    // detect other conditions and redirect to a new url

})
