import axios from '../axios'


export const upload=(data)=>{
    return axios({
        url:'/api/goods/upload',
        method:'post',
        data,
        headers:{
            'Content-Type': "multipart/form-data"
        }
    })
}

export const sell=(data)=>{
    return axios({
        url:'/api/goods/sell',
        method:'post',
        data
    })
}

export const queryAll=(data)=>{
    return axios({
        url:'/api/goods/queryAll',
        method:'post',
        data
    })
}

export const queryItem=(params)=>{
    return axios({
        url:'/api/goods/queryItem?id='+params,
        method:'get'
    })
}
