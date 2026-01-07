/// <reference types="@nuxtjs/color-mode" />
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2026-01-07',
  modules: ['@nuxtjs/color-mode'],

  css: ['~/assets/styles.css'],

  app: {
    head: {
      title: 'Hextech ARAM Wiki',
      htmlAttrs: {
        lang: 'zh'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
        }
      ]
    }
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },

  vite: {
    server: {
      hmr: {
        port: 24679
      }
    }
  },

  nitro: {
    preset: 'static'
  }
});
