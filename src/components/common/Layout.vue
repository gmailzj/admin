<template>
  <div class="main-wrapper">
    <v-head></v-head>
    <div class="left-fixed-right-auto">
      <div class="left">
        <v-sidebar :items="menu"></v-sidebar>
      </div>
      <div class="right">
        <div class="main-content">
          <transition name="move" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import bus from "../common/bus";

export default {
  data() {
    return {
      collapse: false,
      menu: undefined
    };
  },
  components: {
    vHead,
    vSidebar
  },
  created() {
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  },
  /**
      每个守卫方法接收三个参数：
      to: Route: 即将要进入的目标 路由对象
      from: Route: 当前导航正要离开的路由
      next: Function: 一定要调用该方法来 resolve 这个钩子。 执行效果依赖 next 方法的调用参数。
  **/
  beforeRouteEnter(to, from, next) {
    console.log("Home.vue: beforeRouteEnter");
    next(vm => {
      const username = localStorage.getItem("ms_username");
      username ? next() : next("/login");

    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log("Home.vue: beforeRouteUpdate");
    next();
    // 在当前路由改变，但是该组件被复用时调用
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    console.log("Home.vue: beforeRouteLeave");
    next();
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
};
</script>


