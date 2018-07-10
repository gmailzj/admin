import axios from "@/components/common/axios";

var e = {};

function getCertifyList(data) {
  return axios({
    url: "identities",
    method: "POST",
    data: data,
  });
}
function setCertify(data, id){
  return axios({
    url: "auth/"+id,
    method: "POST",
    data: data,
  });
}

e.getCertifyList = getCertifyList;
e.setCertify = setCertify;

export default e;
