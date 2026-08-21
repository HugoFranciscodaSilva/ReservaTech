import ButtonLogout from "@/components/ButtonLogout";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TableItem from "@/components/TableItem";
import { AddItem } from "@/components/DialogItem";



export default function Dashboard(){

    
    return(
        <main className="h-dvh w-full flex flex-col justify-center relative">
            <AddItem/>

            <Link className={cn(buttonVariants({variant:"default"}),'w-min ms-25')} href={'/relatorio'}>Ver relatório</Link>
            <TableItem/>
            <ButtonLogout/>
        </main>
    )
}