'use client'

import ButtonLogout from "@/components/ButtonLogout";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import DialogItem from "@/components/DialogItem";
import { cn } from "@/lib/utils";
import TableItem from "@/components/TableItem";
import { useAuthStore } from "@/store/store";



export default function Dashboard(){

    const userInfo = useAuthStore((state)=> state.userInfo)
    return(
        <main className="h-dvh w-full flex flex-col justify-center relative">
            {userInfo.user?.role && <DialogItem/>}

            <Link className={cn(buttonVariants({variant:"default"}),'w-min ms-25')} href={'/relatorio'}>Ver relatório</Link>
            <TableItem/>
            <ButtonLogout/>
        </main>
    )
}