import jwtDecode from "jwt-decode";


export const CLIENTE_ID='dscatalog';
export const CLIENTE_SECRET='dscatalog123';

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
}
export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

type AccessToke = {
   exp: number;
   user_name: string;
   authorities: Role[];
}

 export const saveSessionData = (loginResponse: LoginResponse) =>{
    localStorage.setItem('authData',JSON.stringify(loginResponse));
 }
 export const getSessionData = () =>{
    console.log(localStorage.getItem('authData') ?? '{}')
    return JSON.parse(localStorage.getItem('authData') ?? '{}') as LoginResponse;
 }

 export const getAccessTokenDecoded = () =>{
     const sessionData = getSessionData();
     const tokenDecoded = jwtDecode(sessionData.access_token) ;
     return tokenDecoded as AccessToke;
 }

 export const isTokenValid = () => {
     const { exp } = getAccessTokenDecoded();
     return Date.now() <= exp*1000;
 }
 export const isAuthenticated = () =>{
   const sessionData = getSessionData();
   return sessionData.access_token && isTokenValid();
 }

 export const isAllowedByRole = (routeRoles :Role[] =[]) =>{
     if (routeRoles.length===0){
         return true;
     }
    const { authorities } = getAccessTokenDecoded();
    return routeRoles.some(role => authorities.includes(role));
}