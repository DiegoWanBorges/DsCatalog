import axios, { AxiosRequestConfig } from 'axios'
import qs from 'query-string'
import base64 from 'base-64'
import { CLIENTE_ID, CLIENTE_SECRET, getSessionData, userToken } from './auth'
import AsyncStorage from '@react-native-async-storage/async-storage'


const BASE_URL='https://diegowanborges-dscatalog.herokuapp.com'


type  LoginData = {
    username:string;
    password:string;
}


export async function makeRequest (params: AxiosRequestConfig)  {
    return await axios({
        ...params,
        baseURL:BASE_URL
    })
}

export async function makePrivateRequest (params: AxiosRequestConfig) {
    const token = await userToken();
    console.log("User token: " + token)
    const headers ={
        Authorization: `Bearer ${token}`
    }
    return  makeRequest({...params,headers});
}

export function makeLogin  (loginData: LoginData ) {
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


