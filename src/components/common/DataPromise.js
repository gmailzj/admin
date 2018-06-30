import axios from "@/components/common/axios";
var t = {};

function getMenu(params) {
  return axios({
    url: "admin/menu",
    method: "get",
    params: params
  });
}

function readMe(params) {
  return axios({
    url: "readme/index",
    method: "get",
    params: params
  });
}

t.getMenu = getMenu;
t.readMe = readMe;

export default t;
