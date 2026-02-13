import type { User, UserState } from '~~/shared/types/user';

export const useUser = () => {
    // 1. Use useCookie for SSR-safe persistence
    // Nuxt will automatically sync this cookie between server and client
    const userCookie = useCookie<User | null>('auth-user', {
        watch: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    // 2. Initialize State with a unique key
    const state = useState<UserState>('auth-user-state', () => ({
        user: userCookie.value || null,
        isAuthenticated: !!userCookie.value,
        lastLogin: null
    }))

    // Sync state when cookie changes (e.g. on client side after login)
    watch(userCookie, (newUser) => {
        state.value.user = newUser || null
        state.value.isAuthenticated = !!newUser
    })

    // 3. Read-only Computed properties (Getters)
    const user = computed(() => state.value.user)
    const isLoggedIn = computed(() => state.value.isAuthenticated)

    // 4. Actions (Methods to update state)
    const setUser = (newUser: User) => {
        userCookie.value = newUser // This updates the cookie and triggers the watch
        state.value.user = newUser
        state.value.isAuthenticated = true
        state.value.lastLogin = new Date().toISOString()
    }

    const clearUser = () => {
        userCookie.value = null
        state.value.user = null
        state.value.isAuthenticated = false
        state.value.lastLogin = null
    }

    const logout = async () => {
        await $fetch('/api/logout', { method: 'POST' })
        clearUser()
        navigateTo('/login')
    }

    return {
        state,
        user,
        isLoggedIn,
        setUser,
        clearUser,
        logout
    }
}