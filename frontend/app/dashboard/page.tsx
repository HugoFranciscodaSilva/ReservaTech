import ButtonLogout from "@/components/ButtonLogout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function Dashboard(){
    return(
        <main className="h-dvh w-full flex flex-col justify-center">           
            <Table className="w-[80%] m-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead className="rounded-tl-md">Nome do Dispositivo</TableHead>
                        <TableHead className="rounded-tr-md">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Celular S20</TableCell>
                        <TableCell>
                            <Button>Reservar</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Celular S20</TableCell>
                        <TableCell>
                            <Button>Reservar</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Celular S20</TableCell>
                        <TableCell>
                            <Button>Reservar</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Celular S20</TableCell>
                        <TableCell>
                            <Button>Reservar</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Celular S20</TableCell>
                        <TableCell>
                            <Button>Reservar</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Link className={buttonVariants({variant:"default"})} href={'/relatorio'}>Ver relatório</Link>
            <ButtonLogout/>
        </main>
    )
}
