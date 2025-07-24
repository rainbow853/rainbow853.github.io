import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'rainbow853',
  description: 'My first VuePress Site',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  theme: defaultTheme({
    logo: 'rainbow.svg',
    sidebar: [
    ],
  }),

  plugins: [

  ],

  dest: './docs/',

  bundler: viteBundler(),
})
