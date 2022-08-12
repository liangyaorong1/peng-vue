import axios from "../axios";

export const saveSend = (data) => {
  return axios({
    url: "/api/chat/saveSend",
    method: "post",
    data,
  });
};

export const queryByCreated = (params) => {
  return axios({
    url: "/api/chat/queryByCreated?goodsId=" + params,
    method: "get",
  });
};

export const queryAll = (params) => {
  return axios({
    url:
      "/api/chat/queryAll?goodsId=" +
      params.goodsId +
      "&toName=" +
      params.toName +
      "&fromName=" +
      params.fromName,
    method: "get",
  });
};

export const queryGroupByGoodsId = (params) => {
  return axios({
    url: "/api/chat/queryGroupByGoodsId?name=" + params,
    method: "get",
  });
};
