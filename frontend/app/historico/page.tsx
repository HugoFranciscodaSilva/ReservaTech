import ButtonLogout from "@/components/ButtonLogout";
import Header from "@/components/Header";
import TableHistory from "@/components/TableHistory";
import { Calendar, EllipsisVertical, Layers } from "lucide-react";
import Link from "next/link";

export default function Historico(){

    return(
        <>
            <Header/>
            <nav className="w-full h-20 bg-card border-y-2 border-borda">
                <ul className="flex h-full px-4 gap-15">
                    <li className="text-textoSecundario">
                        <Link href={'/dashboard'} className="flex gap-3 items-center h-full">
                            <Layers/>
                        <span>Equipamentos</span>
                        </Link>
                    </li>
                    <li className="flex gap-3 text-primaria border-b-2 border-primaria h-full items-center">
                        <Calendar/>
                        <span>Minhas reservas</span>
                    </li>
                </ul>
            </nav>
            <main className="h-dvh w-full flex flex-col relative p-10 bg-fundoSecundairo">
                <section className="my-3">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-textoPrincipal">Minhas Reservas</h2>
                        <p className="text-textoSecundario">Acompanhe seus equipamentos reservados e seu histórico.</p>
                    </div>
                </section>
                <TableHistory/>
            </main>
        </>
    )
}