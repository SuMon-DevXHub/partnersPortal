// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Social Media Monitoring Software",
      titleTemplate: "%s | Ediscovery Service | Sharp Archive",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "keywords",
          content: process.env.META_KEYWORDS,
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
        {
          key: "canonical",
          rel: "canonical",
          href: process.env.NUXT_PUBLIC_SITE_URL,
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  runtimeConfig: {
    google: {
      clientId: "client-id",
      clientSecret: "client-secret",
    },

    public: {
      appName: process.env.APP_NAME,
      siteUrl: process.env.APP_URL,
    },
  },
  // devtools: { enabled: true },

  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "@/assets/css/tailwind.css",
  ],

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
});
