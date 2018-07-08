// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import DataCenter from "vue-data-center";
import ElementUI from "element-ui";
import axios from "@/components/common/axios";

import "./iconfont.css";
import "./index.pcss";
import "element-ui/lib/theme-chalk/index.css"; // 默认主题

// import "babel-polyfill";
// import VueLazyload from "vue-lazyload";
// Vue.use(VueLazyload);
Vue.prototype.$axios = axios;
Vue.use(DataCenter);
Vue.use(ElementUI, {
  size: "small"
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
