import axios from '../axios'

/**
 * 验证码api
 */
export const login=(perms)=>{
    return axios({
        url:'/login?'+perms,
        method:'post'
    })
}

/**
 * 退出api
 */
 export const logout=()=>{
    return axios({
        url:'/logout',
        method:'post'
    })
}