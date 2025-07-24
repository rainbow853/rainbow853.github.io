import comp from "D:/CODE/fengqing/vuepress-starter/docs/.vuepress/.temp/pages/zoom-image-data/component.html.vue"
const data = JSON.parse("{\"path\":\"/zoom-image-data/component.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"layout\":\"CustomLayout\",\"hello\":\"zoom-image-data\"},\"headers\":[{\"level\":2,\"title\":\"效果\",\"slug\":\"效果\",\"link\":\"#效果\",\"children\":[]},{\"level\":2,\"title\":\"Attributes\",\"slug\":\"attributes\",\"link\":\"#attributes\",\"children\":[]},{\"level\":2,\"title\":\"slot\",\"slug\":\"slot\",\"link\":\"#slot\",\"children\":[]},{\"level\":2,\"title\":\"事件\",\"slug\":\"事件\",\"link\":\"#事件\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"zoom-image-data/component.md\",\"excerpt\":\"<h2>效果</h2>\\n\"}")
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
