import ButtonLogout from "@/components/ButtonLogout";
import TableItem from "@/components/TableItem";
import { AddItem } from "@/components/DialogItem";
import ButtonHistory from "@/components/ButtonHistory";



export default function Dashboard(){

    
    return(
        <main className="h-dvh w-full flex flex-col justify-center relative">
            <AddItem/>
            <ButtonHistory/>
            <TableItem/>
            <ButtonLogout/>
        </main>
    )
}