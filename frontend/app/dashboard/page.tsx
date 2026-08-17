'use client'

import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Dashboard(){
    return(
        <main className="h-dvh w-full">
            <Dialog>
                <DialogTrigger className={buttonVariants({variant:"default"})}>Fazer reserva</DialogTrigger>
                <DialogContent>
                    
                    <DialogClose className={buttonVariants({variant:"ghost"})}>Cancelar</DialogClose>
                </DialogContent>
            </Dialog>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        </main>
    )
}