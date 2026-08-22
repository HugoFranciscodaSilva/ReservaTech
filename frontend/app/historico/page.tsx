import TableHistory from "@/components/TableHistory";
import Link from "next/link";

export default function Historico(){

    return(
        <main>
            <TableHistory/>
            <Link href={'/dashboard'}>Voltar para o dashboard</Link>
        </main>
    )
}