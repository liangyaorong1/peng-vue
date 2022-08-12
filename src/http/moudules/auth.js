import axios from '../axios'

/**
 * 发送邮箱验证码api
 */
export const sendEmail=(params)=>{
    return axios({
        url:'/api/auth/sendEmail?email='+params,
        method:'get'
    })
}

export const sendFeedback=(data)=>{
    return axios({
        url:'/api/auth/sendFeedback?email='+data.email+'&content='+data.content,
        method:'get'
    })
}

/**
 * 发送邮箱验证码api
 */
 export const register=(data)=>{
    return axios({
        url:'/api/auth/register?code='+data.code,
        method:'POST',
        data
    })
}

/**
 * 发送邮箱验证码api
 */
 export const forget=(data)=>{
    return axios({
        url:'/api/auth/forgetPass?code='+data.code,
        method:'POST',
        data
    })
}