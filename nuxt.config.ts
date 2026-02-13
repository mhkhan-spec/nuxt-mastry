import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys (Server-side only)
    apiSecret: process.env.NUXT_API_SECRET || 'default_secret',
    
    // Public keys (Exposed to Client)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  },
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: "2024-11-01",

  css: ['~/assets/css/main.css'],

  devtools: { enabled: true },

  vite: {
    plugins: [
      (tailwindcss as any)()
    ]
  }
})