import axios from "axios";
import config from "./config";
import Cookies from "js-cookie";
import router from "@/router";
import store from "@/store";
import { Message } from "element-ui";
import { MessageBox } from "element-ui";
import { Loading } from "element-ui";
let loading;
//内存中正在请求的数量
let loadingNum = 0;
function startLoading() {
  if (loadingNum == 0) {
    loading = Loading.service({
      lock: true,
      text: "拼命加载中...",
      background: "rgba(255,255,255,0.5)",
    });
  }
  //请求数量加1
  loadingNum++;
}
function endLoading() {
  //请求数量减1
  loadingNum--;
  if (loadingNum <= 0) {
    loading.close();
  }
}


export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials,
    });

    // request 拦截器
    instance.interceptors.request.use(
      (config) => {
        startLoading();
        // store.dispatch('SetLoading', true)
        let token = Cookies.get("token");
        config.headers.Authorization = token;
        // //判断当前请求是否设置了不显示Loading
        //2. 带上token
        // if (token) {
          
        // } else {
        //   // 重定向到登录页面
        //   router.push("/login");
        // }
        // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method === "post") {
        }
        return config;
      },
      (error) => {
        // 请求错误时
        console.log("request:", error);
        // 1. 判断请求超时
        if (
          error.code === "ECONNABORTED" &&
          error.message.indexOf("timeout") !== -1
        ) {
          console.log("timeout请求超时");
          Message.error("请求超时!");
          //return service.request(originalRequest);// 再重复请求一次
        }

        // 2. 需要重定向到错误页面
        const errorInfo = error.response;
        console.log(errorInfo);
        if (errorInfo) {
          error = errorInfo.data; // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`,
          });
        }
        return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    );

    // response 拦截器
    instance.interceptors.response.use(
      (response) => {
        endLoading();
        //store.dispatch('SetLoading', false)
        // //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
        // if (response.config.headers.showLoading !== false) {
        //   hideLoading();
        // }
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText);
        } else {
          data = response.data;
        }

        // 根据返回的code值来做不同的处理
        switch (data.rc) {
          case 1:
            console.log(data.desc);
            break;
          case 0:
            store.commit("changeState");
          // setTimeout(() => {
          //   if (response.config.headers.showLoading !== false) {
          //     hideScreenLoading();
          //   }
          // }, 500);
          default:
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.desc)
        // err.data = data
        // err.response = response
        // throw err

        return data;
      },
      (err) => {
        endLoading();
        if (err && err.response) {
          console.log(err.response.status);
          switch (err.response.status) {
            case 400:
              err.message = "请求错误";
              break;
            case 401:
              err.message = err.response.data.msg;
              break;
            case 403:
              err.message = "拒绝访问";
              break;
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`;
              break;
            case 408:
              err.message = "请求超时";
              break;
            case 500:
              err.message = err.response.data.msg;
              Cookies.remove("token"); //清除token
              break;
            case 501:
              err.message = "服务未实现";
              break;
            case 502:
              err.message = "网关错误";
              break;
            case 503:
              err.message = "服务不可用";
              break;
            case 504:
              err.message = "网关超时";
              break;
            case 505:
              err.message = "HTTP版本不受支持";
              break;
            default:
          }
        }
        console.log(err)
        // Message.error(err);
        return Promise.reject(err); // 返回接口返回的错误信息
      }
    );

    // 请求处理
    instance(options)
      .then((res) => {
        resolve(res);
        return false;
      })
      .catch((error) => {
        reject(error);
      });
  });
}
