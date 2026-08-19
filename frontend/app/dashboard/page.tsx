import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Dashboard(){
    return(
        <main className="h-dvh w-full">           
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="rounded-tl-md">Nome</TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                        <TableHead className="rounded-tr-md"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        
                    </TableRow>
                </TableBody>
            </Table>
        </main>
    )
}