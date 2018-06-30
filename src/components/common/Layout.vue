<template>
    <div class="main-wrapper">
        <!-- <v-head></v-head> -->
        <div class="left-fixed-right-auto">
          <v-sidebar :items="menu"></v-sidebar>
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
import dataPromise from "@/components/common/DataPromise";

export default {
  data() {
    return {
      collapse: false,
      menu:undefined
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
      return false;
      // 通过 `vm` 访问组件实例
      console.log(vm);
      dataPromise.getMenu().then(function(res) {
        // console.log(res)
        if (res && res.data && res.data.code === 1) {
          var menu = res.data.data.menu;
          var userInfo = res.data.data.user_info;
          console.log(menu, userInfo);
          vm.menu = menu;
        } else {
          vm.$router.replace({
            path: "/login"
          });
        }
      });
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

<style>
.main-wrapper{
  height: 100%;
    width: 100%;
}
.left-fixed-right-auto{
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
}
</style>
