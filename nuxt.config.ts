// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['nuxt-auth-sanctum', "shadcn-nuxt"],
  sanctum: {
    baseUrl: "http://localhost:8000",

    endpoints: {
      csrf: "/sanctum/csrf-cookie",
      login: "/login",
      logout: "/logout",
      user: "/api/user",
    },
    redirectIfUnauthenticated: true,
    redirect: {
      onLogin: "/admin",
      onLogout: "/login",
      onAuthOnly: "/login",
      onGuestOnly: "/admin"
    },
    
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})