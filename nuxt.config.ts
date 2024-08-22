// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Customer Loans",
      link: [
        { rel: "icon", href: "/favicon.ico" },
      ],
      script: [
        { type: 'text/javascript', src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js' },
      ]
    },
  },

  css: [
    '~/assets/sass/main.sass'
  ],

  devtools: { enabled: true },
  ssr: false,
})