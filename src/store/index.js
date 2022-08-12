import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import user from './modules/user'
import index from './modules/index'
import goodsinfo from './modules/goodsinfo'
import headBar from './modules/headBar'
import chat from './modules/chat'
const store = new vuex.Store({
    modules: {
        user,
        index,
        goodsinfo,
        headBar,
        chat
    }
})

export default store