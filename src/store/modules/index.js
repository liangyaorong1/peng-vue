export default {
    state: {
        goods:[]
    },
    getters: {
        getGoods(state){
            return state.goods;
        }
    },
    mutations: {
        setGoods(state, perms){  
            state.goods = perms;
        }
    },
    actions: {
    }
}