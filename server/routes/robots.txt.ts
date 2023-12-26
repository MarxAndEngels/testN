import {currentSite} from "~/app/variables";

export default defineEventHandler((event) => {
    const host = getRequestHost(event)

    let data = "User-agent: *\n" +
        "Disallow: /";

    if (currentSite(host).root) {
        data = "User-agent: *\n" +
            "Disallow: /*thanks*\n" +
            "Disallow: /*used*\n" +
            "Disallow: /*policy*\n" +
            "Disallow: /*?*\n" +
            "Allow: *.js\n" +
            "Allow: *.css\n" +
            "Allow: *.png\n" +
            "Allow: *.svg\n" +
            "Allow: *.jpg\n" +
            "Allow: *.jpeg\n" +
            "Allow: *.woff\n" +
            "Allow: *.ttf"
    }
    setResponseHeader(event, 'Content-Type', 'text/plain')
    return data
})