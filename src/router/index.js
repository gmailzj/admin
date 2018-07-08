import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      // 页面总体结构框架
      component: resolve =>
        require(["../components/common/Layout.vue"], resolve),
      children: [
        {
          path: "/",
          component: resolve =>
            require(["../components/common/Readme.vue"], resolve)
        },
        {
          path: "/userlist",
          component: resolve =>
            require(["../components/page/UserList.vue"], resolve)
        }
      ]
    },
    {
      path: "/login",
      component: resolve => {
        return require(["../components/page/Login.vue"], resolve);
      }
    }
  ]
});
