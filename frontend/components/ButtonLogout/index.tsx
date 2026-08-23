'use client'

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/store";
import { useQueryClient } from "@tanstack/react-query";

export default function ButtonLogout(){

    const router = useRouter()
    const clearSession = useAuthStore((state)=> state.clearSession)
    const queryClient = useQueryClient()

    function Logout(){
        Cookies.remove('token')
        alert("Saindo...")
        clearSession()
        queryClient.clear()
        router.push('/')
    }

    return(
        <Button className={'absolute bottom-2 right-10'} onClick={Logout}><LogOut/>Fazer logout</Button>
    )
}