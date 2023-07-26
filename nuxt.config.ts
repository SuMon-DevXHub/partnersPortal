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
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: '/favicon.png',
        },
        {
          key: "canonical",
          rel: "canonical",
          href: process.env.NUXT_SITE_URL,
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "my-layouts", mode: "out-in" },
    cdnURL: "https://cdn.sharparchive.com/partner",
  },

  runtimeConfig: {
    apiUrl: process.env.NUXT_API_BASE_URL,
    google: {
      clientId: "client-id",
      clientSecret: "client-secret",
    },

    public: {
      appName: process.env.NUXT_APP_NAME,
      siteUrl: process.env.NUXT_SITE_URL,
      apiUrl: process.env.NUXT_API_BASE_URL,
      googleMapKey: process.env.NUXT_GOOGLE_MAP_KEY,
      stripeKey: process.env.STRIPE_KEY,
    },
  },
  // devtools: { enabled: true },

  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "v-calendar/dist/style.css",
    "@/assets/css/tailwind.css",
  ],

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  // nitro: {
  //   storage: {
  //     redis: {
  //       driver: "redis",
  //       url: process.env.REDIS_URL,
  //     },
  //   },
  //   devStorage: {
  //     redis: {
  //       driver: "fs",
  //       base: "./data/db",
  //     },
  //   },
  // },
  routeRules: {
    "/server/**": {
      proxy: { to: `${process.env.NUXT_API_BASE_URL}/**` },
      // cache: {
      //   maxAge: 60 * 1
      // }
    },
  },
});
