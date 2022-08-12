import axios from '../axios'

export const userInfo=()=>{
    return axios({
        url:'/api/user/userInfo',
        method:'get'
    })
}