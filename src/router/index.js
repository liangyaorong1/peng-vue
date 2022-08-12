import Vue from "vue";
import Router from "vue-router";
import Cookies from "js-cookie";
import api from "@/http/api";
import store from "@/store";
import {MessageBox} from "element-ui"
Vue.use(Router);

//路由
const router = new Router({
  routes: [
    {
      path: "/",
      name: "首页",
      redirect:'/index',
    },
    {
      path: "/index",
      name: "首页",
      component: () => import("@/views/index")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login")
    },
    {
      path: "/goodsinfo",
      name: "goodsinfo",
      component: () => import("@/views/goodsinfo")
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("@/views/chat")
    },
    {
      path: "/personal",
      name: "personal",
      component: () => import("@/views/personal")
    },
    {
      path: "/bootstrap",
      name: "bootstrap",
      component: () => import("@/views/bootstrap")
    },
    {
      path: "/404",
      name: "notFound",
      component: () => import("@/views/error/404")
    }
  ],
});

const originalpush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalpush.call(this, location).catch((err) => err);
};

// 解决Loading chunk (\d)+ failed问题
router.onError((error) => {
  console.error(error);
  const pattern = /Loading chunk/g;
  // const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed && error.type === "missing") {
    // const targetPath = $router.history.pending.fullPath
    router.push(targetPath);
  }
});

//路由卫士
// router.beforeEach((to, from, next) => {
//   // 登录界面登录成功之后，会把用户信息保存在会话
//   // 存在时间为会话生命周期，页面关闭即失效。
//   let token = Cookies.get("token");
//   if (to.path === "/login") {
//     // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
//     if (token) {
//       next({
//         path: "/",
//       });
//     } else {
//       next();
//     }
//   }
// });

export default router;
