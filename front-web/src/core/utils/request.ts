import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { CLIENTE_ID, CLIENTE_SECRET, getSessionData, logout } from './auth'


type  LoginData = {
    username:string;
    password:string;
}

const BASE_URL= process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8080";

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    switch(error.response.status) { 
        case 401: { 
           logout();

           break; 
        } 
     }
    return Promise.reject(error);
  });

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