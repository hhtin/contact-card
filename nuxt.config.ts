export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css', '@fortawesome/fontawesome-free/css/all.min.css'],
  app: {
    head: {
      title: 'Thẻ Liên Hệ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ],
    },
  },
});