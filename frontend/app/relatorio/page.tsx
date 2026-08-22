import TableReport from "@/components/TableReport";
import Link from "next/link";

export default function Relatorio(){
    return(
        <main>
            <TableReport/>
            <Link href={'/dashboard'}>Voltar para o dashboard</Link>
        </main>
    )
}