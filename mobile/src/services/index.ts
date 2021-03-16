import axios, { AxiosRequestConfig } from 'axios'
import qs from 'query-string'
import base64 from 'base-64'
import { CLIENTE_ID, CLIENTE_SECRET, getSessionData } from './auth'


const BASE_URL='https://diegowanborges-dscatalog.herokuapp.com'


type  LoginData = {
    username:string;
    password:string;
}


export const makeRequest =(params: AxiosRequestConfig) => {
    return axios({
        ...params,
        baseURL:BASE_URL
    })
}

export const makePrivateRequest =(params: AxiosRequestConfig) => {
    const sessionData = getSessionData();
    const headers ={
        Authorization: `Bearer ${sessionData.access_token}`
    }
    return makeRequest({...params,headers});
}

export const makeLogin = (loginData: LoginData ) => {
    const token= `${CLIENTE_ID}:${CLIENTE_SECRET}`;;
    const headers ={
        Authorization:`Basic ${base64.encode(token)}`,
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


