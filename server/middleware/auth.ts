export default defineEventHandler((event) => {
    // 1. Grab the cookie (Nuxt auto-serializes JSON cookies)
    const userCookie = getCookie(event, 'auth-user')

    if (userCookie) {
        try {
            // 2. Attach to context so server/api routes can access it
            event.context.user = JSON.parse(userCookie)
        } catch {
            event.context.user = null
        }
    }
})