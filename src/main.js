// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import DataCenter from "vue-data-center";
import ElementUI from "element-ui";
import axios from "@/components/common/axios";

// import "./iconfont.css";
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


// 使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   console.log("router.beforeEach");
//   console.log(to.meta);
//   if (to.meta.permission) {
//       const role = localStorage.getItem("ms_username");
//       // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//       role ? next() : next("/login");
//   } else {
//       next();
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
