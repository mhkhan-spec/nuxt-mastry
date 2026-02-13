export default defineNuxtRouteMiddleware((to, from) => {
    const { isLoggedIn } = useUser()

    // If the user isn't logged in and isn't already going to login
    if (!isLoggedIn.value && to.path !== '/login') {
        return navigateTo('/login', { replace: true })
    }

    // If the user is logged in and tries to go to login, send them to projects
    if (isLoggedIn.value && to.path === '/login') {
        return navigateTo('/projects', { replace: true })
    }
})