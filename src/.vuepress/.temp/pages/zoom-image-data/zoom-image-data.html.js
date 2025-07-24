import comp from "D:/CODE/fengqing/vuepress-starter/docs/.vuepress/.temp/pages/zoom-image-data/zoom-image-data.html.vue"
const data = JSON.parse("{\"path\":\"/zoom-image-data/zoom-image-data.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"hello\":\"zoom-image-data\"},\"headers\":[{\"level\":2,\"title\":\"效果\",\"slug\":\"效果\",\"link\":\"#效果\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"zoom-image-data/zoom-image-data.md\"}")
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
