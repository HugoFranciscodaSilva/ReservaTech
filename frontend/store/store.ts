import {create} from 'zustand'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

interface userPayload{
    id:number,
    role:string
}

interface authStore{
    userInfo:{
        token:string | null,
        user:userPayload | null
    }
    updateSession: ()=> void
}

function userTokenDecode(){

    if(typeof window === "undefined"){
        return {token:null,user:null}
    }

    const token = Cookies.get('token')

    if(!token){
        return {token:null,user:null}
    }

    try {
        const user = jwtDecode<userPayload>(token)
        return {token,user}
    } catch (error) {
        console.log("Erro ao decodificar token, ",error)
        return {token:null, user:null}
    }
}

export const useAuthStore = create<authStore>((set)=>({
    userInfo: userTokenDecode(),
    updateSession: ()=>set({userInfo:userTokenDecode()})
}))