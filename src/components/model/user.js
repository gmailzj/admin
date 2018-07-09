import axios from "@/components/common/axios";

var e = {};

function getCertifyList(data) {
  return axios({
    url: "identities",
    method: "POST",
    data: data,
  });
}

e.getCertifyList = getCertifyList;

export default e;
