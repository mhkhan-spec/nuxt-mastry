export default defineEventHandler((event) => {
    // event.context.user is populated by server/middleware/auth.ts
    const user = event.context.user

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Not authenticated'
        })
    }

    return {
        user
    }
})
