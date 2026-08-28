import ButtonLogout from "@/components/ButtonLogout";
import TableItem from "@/components/TableItem";
import { AddItem } from "@/components/DialogItem";
import ButtonHistory from "@/components/ButtonHistory";



export default function Dashboard(){

    
    return(
        <main className="h-dvh w-full flex flex-col justify-center relative p-10">
            <section className="my-3">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Equipamentos</h2>
                    <p className="text-muted-foreground">Consulte a disponibilidade e reserve um equipamento.</p>
                </div>
            </section>
            <TableItem/>
            <AddItem/>
            <ButtonHistory/>
            <ButtonLogout/>
        </main>
    )
}