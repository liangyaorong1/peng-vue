import axios from '../axios'

export const push=(data)=>{
    return axios({
        url:'/api/leaving/push',
        method:'post',
        data
    })
}

export const queryAll=(params)=>{
    return axios({
        url:'/api/leaving/queryAll?goodsId='+params,
        method:'get'
    })
}