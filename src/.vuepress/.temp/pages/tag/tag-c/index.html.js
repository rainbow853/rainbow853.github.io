import comp from "D:/CODE/fengqing/vuepress-starter/docs/.vuepress/.temp/pages/tag/tag-c/index.html.vue"
const data = JSON.parse("{\"path\":\"/tag/tag-c/\",\"title\":\"Tag tag C\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Tag tag C\",\"sidebar\":false,\"blog\":{\"type\":\"category\",\"name\":\"tag C\",\"key\":\"tag\"},\"layout\":\"Tag\"},\"headers\":[],\"git\":{},\"filePathRelative\":null,\"excerpt\":\"\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
