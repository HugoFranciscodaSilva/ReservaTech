import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import TableHistory from "@/components/TableHistory";
export default function Historico(){

    return(
        <>
            <Header/>
            <Navbar/>
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