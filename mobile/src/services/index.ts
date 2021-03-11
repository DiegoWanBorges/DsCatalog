import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL='https://diegowanborges-dscatalog.herokuapp.com'

export const makeRequest =(params: AxiosRequestConfig) => {
    return axios({
        ...params,
        baseURL:BASE_URL
    })
}


