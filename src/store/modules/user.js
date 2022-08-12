export default {
    state: {
        perms: [],  // 用户权限标识集合
        userInfo:JSON.parse(localStorage.getItem("USER_INFO")) || {},
    },
    getters: {
        //获取用户信息
        userInfo(state){
            return state.userInfo;
        }
    },
    mutations: {
        setPerms(state, perms){  // 用户权限标识集合
            state.perms = perms;
        },
        setUserInfo(state, perms){//用户基本信息
            state.userInfo=perms;
            localStorage.setItem("USER_INFO",JSON.stringify(perms));
        }
    },
    actions: {
    }
}