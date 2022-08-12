export default {
    state: {
        id:JSON.parse(localStorage.getItem("ID")) || '',
    },
    getters: {
        //获取用户信息
        id(state){
            return state.id;
        }
    },
    mutations: {
        setId(state, perms){  // 用户权限标识集合
            state.id = perms;
            localStorage.setItem("ID",JSON.stringify(perms));
        }
    },
    actions: {
    }
}