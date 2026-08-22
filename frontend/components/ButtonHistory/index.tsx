'use client'

import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/store"

interface configProps{
    link:string,
    text:string
}

export default function ButtonHistory(){

    const [hasMounted,setHasMounted] = useState<boolean>(false)
    const userRole = useAuthStore((state) => state.userInfo.user?.role)
    const config:configProps = {link:"",text:""}

    useEffect(()=>{
        setHasMounted(true)
    },[])

    if(!hasMounted){
        return null
    }

    if(userRole === "Aluno"){
        config.link = '/historico'
        config.text = "Meu histórico"
    }
    if(userRole === "Administrador"){
        config.link = '/relatorio'
        config.text = "Ver relatório"
    }

    return(
        <Link className={cn(buttonVariants({variant:"default"}),'w-min ms-25')} href={config.link}>{config.text}</Link>
    )
}
