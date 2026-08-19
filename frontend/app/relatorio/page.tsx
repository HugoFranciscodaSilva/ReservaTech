import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function Relatorio(){
    return(
        <main>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item Reservado</TableHead>
                        <TableHead>Data da Reserva</TableHead>
                        <TableHead>Data de Devolução</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Celular S20</TableCell>
                        <TableCell>25/06/2026</TableCell>
                        <TableCell>08/08/2026</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Link href={'/dashboard'}>Voltar para o dashboard</Link>
        </main>
    )
}