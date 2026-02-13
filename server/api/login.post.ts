import type { User } from '~~/shared/types/user'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body

    // Mock authentication
    if (email === 'admin@example.com' && password === 'password') {
        const user: User = {
            id: '1',
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'admin',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
        }

        // Set the cookie for SSR and future requests
        // Using a short name like 'auth-user' to match the server middleware
        setCookie(event, 'auth-user', JSON.stringify(user), {
            httpOnly: false, // Set to false if you want to read it from client-side (though we'll use useCookie)
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/'
        })

        return {
            user
        }
    }

    throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
    })
})
