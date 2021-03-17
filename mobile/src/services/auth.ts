import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const CLIENTE_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
export const CLIENTE_SECRET = process.env.CLIENTE_SECRET ?? 'dscatalog123';


export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

type AccessToken = {
   exp: number;
   user_name: string;
   authorities: Role[];
}

export async function saveSessionData (token: string){
   await AsyncStorage.setItem('token', token);
   

}
export async function userToken() {
     const token = await AsyncStorage.getItem('token')
     return token
}


export async function isAuthenticated() {
   try {
      const token = await AsyncStorage.getItem('token');
      return token ? true : false;
   } catch (error) {
      console.log(error)
   }
}
export async function doLogout() {
   try {
      await AsyncStorage.removeItem("token")
   } catch (error) {
      console.log(error)
   }
}



