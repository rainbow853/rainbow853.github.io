export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"D:/CODE/template/github.io/src/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":""} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/CODE/template/github.io/src/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/transfer2window/", { loader: () => import(/* webpackChunkName: "transfer2window_index.html" */"D:/CODE/template/github.io/src/.vuepress/.temp/pages/transfer2window/index.html.js"), meta: {"title":""} }],
  ["/zoom-image-data/", { loader: () => import(/* webpackChunkName: "zoom-image-data_index.html" */"D:/CODE/template/github.io/src/.vuepress/.temp/pages/zoom-image-data/index.html.js"), meta: {"title":""} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/CODE/template/github.io/src/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
