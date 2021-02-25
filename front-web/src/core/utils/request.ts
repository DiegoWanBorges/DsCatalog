import axios, { Method } from 'axios'
import qs from 'qs'
import { CLIENTE_ID, CLIENTE_SECRET } from './auth'

type RequestParams ={
    method?: Method;
    url: string;
    data?:object | string;
    params?:object;
    headers?:object
}

type  LoginData = {
    username:string;
    password:string;
}

const BASE_URL="http://localhost:8080"

export const makeRequest =({ method='GET', url,data,params,headers}: RequestParams) => {
    return axios({
        method: method,
        url: `${BASE_URL}${url}`,
        data:data,
        params:params,
        headers:headers
    })
}

export const makeLogin = (loginData: LoginData ) => {
    const token= `${CLIENTE_ID}:${CLIENTE_SECRET}`;;
    const headers ={
        Authorization:`Basic ${window.btoa(token)}`,
        'Content-Type': `application/x-www-form-urlencoded`
    }
    const payload = qs.stringify({
        ...loginData,
        grant_type: 'password'
    })
    return makeRequest({
        url:'/oauth/token',
        data:payload,
        method:'POST',
        headers:headers
    })
}