// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "@/assets/css/tailwind.css",
  ],

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
});
