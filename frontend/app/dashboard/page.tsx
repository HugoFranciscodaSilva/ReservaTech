'use client'

import ButtonLogout from "@/components/ButtonLogout";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {jwtDecode} from 'jwt-decode'
import cookies from "js-cookie";
import DialogItem from "@/components/DialogItem";
import { cn } from "@/lib/utils";
import TableItem from "@/components/TableItem";

interface payload{
    id:number,
    role:string
}

export default function Dashboard(){
    const token = cookies.get('token') || "opa"
    const user = jwtDecode<payload>(token)
    return(
        <main className="h-dvh w-full flex flex-col justify-center relative">
            {user.role && <DialogItem/>}

            <Link className={cn(buttonVariants({variant:"default"}),'w-min ms-25')} href={'/relatorio'}>Ver relatório</Link>
            <TableItem/>
            <ButtonLogout/>
        </main>
    )
}