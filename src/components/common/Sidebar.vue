<template>
    <div class="left-menu">
      <h2 data-v-326546e8="">Zan Proxy</h2>
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i class="iconfont" :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.name }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i class="iconfont" :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "../common/bus";
export default {
  props: {
    "items":{
    default: function () {

      return [{
          name: '使用说明',
          icon: 'icon-search',
          index: 'home'
        },
        {
          name: '工程路径配置',
          icon: 'icon-layers',
          index: 'projectpath'
        },
        {
          name: 'Host 管理',
          icon: 'icon-box',
          index: 'hostfilelist'
        },
        {
          name: 'Http 转发',
          icon: 'icon-skip',
          index: 'rulefilelist'
        },
        {
          name: '自定义 mock 数据',
          icon: 'icon-suoding',
          index: 'datalist'
        },
        {
          name: '请求监控',
          icon: 'icon-bargraph',
          index: '/monitor.html',
          targetBlank: true
        },
        {
          name: '帮助中心',
          icon: 'icon-security',
          index: 'https://youzan.github.io/zan-proxy/',
          targetBlank: true
        },
        {
          name: '插件管理',
          icon: 'icon-layers',
          index: 'plugins'
        },
        {
          icon: "el-icon-setting",
          index: "5",
          name: "系统管理",
          subs: [
            {
              index: "log",
              name: "操作日志"
            },
            {
              index: "admin",
              name: "账号管理"
            },
            {
              index: "role",
              name: "角色管理"
            }
          ]
        }];
    }
  }},

  data() {
    return {
      collapse: false,
    };
  },
  // 在模板中放入太多的逻辑会让模板过重且难以维护 对于任何复杂逻辑 计算属性
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
    // 计算属性的 getter
    reversedMessage: function() {
      // `this` 指向 vm 实例
      return this.message
        .split("")
        .reverse()
        .join("");
    }
  },
  beforeCreate() {
    // 组件生命周期函数
    console.log("sidebar beforeCreate");
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
    console.log("sidebar created");
  },
  methods: {}
};
</script>

<style scoped>
.left-menu {
  z-index: 1;
  width: 230px;
  height: 100%;
  user-select: none;
  position: relative;
  overflow-x: hidden;
  background-image: linear-gradient(#3b3e8f, #6f73d7);

  h2 {
    color: #fff;
    font-size: 20px;
    line-height: 72px;
    padding-left: 22px;
    font-weight: normal;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    font-family: Dosis, Source Sans Pro, Helvetica Neue, Arial, sans-serif;
  }

  .iconfont {
    width: 28px;
    display: inline-block;
  }

  .icon-bargraph {
    font-size: 15px;
  }

  .icon-set,
  .icon-skip,
  .icon-box {
    opacity: 0.8;
  }

  .el-menu {
    background-color: transparent;
  }

  .el-submenu__title,
  .el-menu-item {
    color: #fff;
    height: 52px;
    line-height: 52px;
    border-left: 3px solid transparent;

    &.is-active,
    &:hover {
      background-color: #393c89;
    }

    &.is-active {
      border-color: #32e7d7;
    }
  }
}
</style>
