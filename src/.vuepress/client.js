import { defineClientConfig } from 'vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Transfer2window from './components/Transfer2window.vue'
import ZoomImage from './components/ZoomImage.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.use(ElementPlus)
    app.component('Transfer2window', Transfer2window)
    app.component('ZoomImage', ZoomImage)
  },
})
