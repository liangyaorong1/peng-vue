export default {
    state: {
        goodsId:JSON.parse(localStorage.getItem("GOODS_ID")) || '',
        toName:JSON.parse(localStorage.getItem("TO_NAME")) || ''
    },
    getters: {
        goodsId(state){
            return state.goodsId;
        },
        toName(state){
            return state.toName;
        }
    },
    mutations: {
        setGoodsId(state, perms){ 
            state.goodsId = perms;
            localStorage.setItem("GOODS_ID",JSON.stringify(perms));
        },
        setToName(state, perms){
            state.toName = perms;
            localStorage.setItem("TO_NAME",JSON.stringify(perms));
        }
    },
    actions: {
        setGoodsId({commit},perms){
            commit('setGoodsId',perms);
        },
        setToName({commit},perms){
            commit('setToName',perms);
        }
    }
}