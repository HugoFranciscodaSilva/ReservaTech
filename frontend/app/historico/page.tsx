import ButtonLogout from "@/components/ButtonLogout";
import TableHistory from "@/components/TableHistory";
import { Calendar, EllipsisVertical, Layers } from "lucide-react";
import Link from "next/link";

export default function Historico(){

    return(
        <>
            <header className="bg-fundoPrincipal py-3 flex items-center justify-between px-10">
                <h2 className="text-2xl font-bold text-textoPrincipal">Reserva<strong className="font-bold text-primaria">Tech</strong></h2>
                <h2 className="text-xl text-textoPrincipal">Minhas Reservas</h2>
                <section className="flex gap-5 items-center">
                    <div>
                        <h3 className="text-textoPrincipal">Usuario</h3>
                        <p className="text-textoSecundario">Aluno</p>
                    </div>
                    <EllipsisVertical className="text-textoSecundario"/>
                    <ButtonLogout/>
                </section>
            </header>
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