import TableItem from "@/components/TableItem";
import { AddItem } from "@/components/DialogItem";
import ButtonHistory from "@/components/ButtonHistory";
import { Calendar, Layers} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";

export default function Dashboard(){

    
    return(
        <>
            <Header/>
            <nav className="w-full h-20 bg-card border-y-2 border-borda">
                <ul className="flex h-full px-4 gap-15">
                    <li className="flex gap-3 text-primaria border-b-2 border-primaria h-full items-center">
                        <Layers/>
                        <span>Equipamentos</span>
                    </li>
                    <li  className="text-textoSecundario">
                        <Link href={'/historico'} className="flex gap-3 items-center h-full">
                            <Calendar/>
                            <span>Minhas reservas</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <main className="h-dvh w-full flex flex-col p-10 bg-fundoSecundairo">
                <section className="my-3 flex justify-between">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-textoPrincipal">Equipamentos</h2>
                        <p className="text-textoSecundario">Consulte a disponibilidade e reserve um equipamento.</p>
                    </div>
                    <AddItem/>
                </section>
                <TableItem/>
                <ButtonHistory/>
            </main>
        </>
    )
}