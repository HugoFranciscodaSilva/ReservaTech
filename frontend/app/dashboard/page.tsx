import TableItem from "@/components/TableItem";
import { AddItem } from "@/components/DialogItem";
import ButtonHistory from "@/components/ButtonHistory";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function Dashboard(){

    
    return(
        <>
            <Header/>
            <Navbar/>
            <main className="h-dvh w-full flex flex-col p-10 bg-fundoSecundairo">
                <section className="my-3 flex justify-between">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-textoPrincipal">Equipamentos</h2>
                        <p className="text-textoSecundario">Consulte a disponibilidade e reserve um equipamento.</p>
                    </div>
                    <AddItem/>
                </section>
                <TableItem/>
            </main>
        </>
    )
}