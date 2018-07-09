import axios from "axios";
// import ElementUI from "element-ui";
import Vue from "vue";
import router from "../../router";
import qs from 'qs';
import configData from "@/configs/index";
import { t as cookieToken } from "@/components/common/CookieToken";

const service = axios.create({
  baseURL: configData.apiPrefix,
  timeout: 10e3,
  withCredentials: true,
});
// 发送请求前处理request的数据
axios.defaults.transformRequest = [
  function(data) {
    let newData = "";
    for (let k in data) {
      newData +=
        encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
    }
    return newData;
  }
];

// request拦截器
service.interceptors.request.use(
  // config => {
  //     // 发送请求之前，要做的业务
  //     return config;
  // },
  function(config) {
    var  token = cookieToken.getCookieToken();
    if ("post" === config.method) {
      config.headers = {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      };
      if((token)){
        config.headers.token = token;
      }
      // config.data = JSON.stringify(config.data);
      config.data && (config.data = qs.stringify(config.data));
    }
    return config;
  },
  error => {
    // 错误处理代码

    return Promise.reject(error);
  }
);

// response拦截器
service.interceptors.response.use(
  // response => {
  //     // 数据响应之后，要做的业务
  //     return response;
  // },
  function(e) {
    console.log(e.data);
    var t = e.data;
    if (501 === t.code) {
      // Vue.prototype
      Vue.prototype
        .$confirm("请重新登录！", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(function() {
          router.push("/login");
        });
    } else {
      if (1e4 !== t.code) return e;
      Vue.prototype.$Message({
        message: t.msg,
        type: "warning"
      });
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
