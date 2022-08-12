/* 
 * 接口统一集成模块
 */

import * as auth from './moudules/auth'
import * as login from './moudules/login'
import * as user from './moudules/user'
import * as goods from './moudules/goods'
import * as leavingMessage from './moudules/leavingMessage'
import * as chat from './moudules/chat'
import * as order from './moudules/order'
// 默认全部导出
export default {
    auth,
    login,
    user,
    goods,
    leavingMessage,
    chat,
    order
}