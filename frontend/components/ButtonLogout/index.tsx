'use client'

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ButtonLogout(){

    const router = useRouter()

    function Logout(){
        Cookies.remove('token')
        alert("Saindo...")
        router.push('/')
    }

    return(
        <Button className={'absolute bottom-2 right-10'} onClick={Logout}><LogOut/>Fazer logout</Button>
    )
}