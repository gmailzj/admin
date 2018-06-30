"use strict";
import axios from "@/components/common/axios";
var t = {};

function o(e) {
  return axios({
    url: "login/check",
    method: "POST",
    data: e
  });
}
function a(e) {
  return axios({
    url: "login/user_info",
    method: "get",
    params: e
  });
}
function r(e) {
  return axios({
    url: "login/get_access_token",
    method: "POST",
    data: e
  });
}
function i(e) {
  return axios({
    url: "login/change_password",
    method: "POST",
    data: e
  });
}

t.loginCheck = o;
t.fetchUserinfo = a;
t.getAccessToken = r;
t.changePassword = i;

export default t;
