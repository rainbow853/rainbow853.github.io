import comp from "D:/CODE/fengqing/vuepress-starter/docs/.vuepress/.temp/pages/article/index.html.vue"
const data = JSON.parse("{\"path\":\"/article/\",\"title\":\"Articles\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Articles\",\"sidebar\":false,\"blog\":{\"type\":\"type\",\"key\":\"article\"},\"layout\":\"Article\"},\"headers\":[],\"git\":{},\"filePathRelative\":null,\"excerpt\":\"\"}")
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
