export default defineEventHandler((event) => {
    deleteCookie(event, 'auth-user', {
        path: '/'
    })

    return {
        message: 'Logged out successfully'
    }
})
