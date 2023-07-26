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
          href: 'https://parterns-portal-devxhub.netlify.app/',
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "my-layouts", mode: "out-in" },
    cdnURL: "https://cdn.sharparchive.com/partner",
  },

  runtimeConfig: {
    apiUrl: 'https://dev-api.sharparchive.com/api',
    google: {
      clientId: "client-id",
      clientSecret: "client-secret",
    },

    public: {
      appName: 'Sharp Archive',
      siteUrl: 'https://parterns-portal-devxhub.netlify.app/',
      apiUrl: 'https://dev-api.sharparchive.com/api',
      googleMapKey: 'AIzaSyBMQgZvqzCVG0FFT5RsE59wjEYzQLncahI',
      stripeKey: 'pk_test_51JPtOfFxsmIraXHUAgpplP9Gxn4LxlAnIgPgEaP5ruKyycAdJvv8ZrHHuPq11EQIDPSzDDjen1hZzF8cRiMqHOQg00kf7ORCg1',
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
      proxy: { to: `https://dev-api.sharparchive.com/api/**` },
      // cache: {
      //   maxAge: 60 * 1
      // }
    },
  },
});
