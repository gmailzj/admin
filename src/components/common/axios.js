import axios from "axios";
// import ElementUI from "element-ui";
import Vue from "vue";
import router from "../../router";

const service = axios.create({
  baseURL: "/api",
  timeout: 10e3,
  withCredentials: true
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
  function(e) {
    return (
      "post" === e.method &&
        ((e.headers = {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }),
        (e.data = JSON.stringify(e.data))),
      e
    );
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
    var t = e.data;
    if (
      50001 === t.errcode ||
      50008 === t.errcode ||
      50012 === t.errcode ||
      50014 === t.errcode
    ) {
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
      if (1e4 !== t.errcode) return e;
      Vue.prototype.$Message({
        message: t.desc,
        type: "warning"
      });
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
