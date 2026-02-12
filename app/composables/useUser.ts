import type { User, UserState } from '~~/shared/types/user';

export const useUser = () => {
    // 1. Initialize State with a unique key
    // This state is shared across all components using useUser()
    const state = useState<UserState>('auth-user', () => ({
        user: null,
        isAuthenticated: false,
        lastLogin: null
    }))

    // 2. Read-only Computed properties (Getters)
    const user = computed(() => state.value.user)
    const isLoggedIn = computed(() => state.value.isAuthenticated)

    // 3. Actions (Methods to update state)
    const setUser = (newUser: User) => {
        state.value.user = newUser
        state.value.isAuthenticated = true
        state.value.lastLogin = new Date().toISOString()
    }

    const logout = () => {
        state.value.user = null
        state.value.isAuthenticated = false
        state.value.lastLogin = null
        // Redirect logic can also go here
        navigateTo('/')
    }

    return {
        state, // Useful for direct debugging
        user,
        isLoggedIn,
        setUser,
        logout
    }
}