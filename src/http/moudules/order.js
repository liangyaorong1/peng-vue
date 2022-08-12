import axios from '../axios'

export const add=(data)=>{
    return axios({
        url:'/api/order/add',
        method:'post',
        data
    })
}

export const queryAll=(params)=>{
    return axios({
        url:'/api/order/queryAll?userId='+params,
        method:'get'
    })
}

export const updateStatus=(params)=>{
    return axios({
        url:'/api/order/updateStatus?id='+params,
        method:'put'
    })
}