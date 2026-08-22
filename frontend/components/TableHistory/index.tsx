'use client'

import { API } from "@/service/axios"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useQuery } from "@tanstack/react-query"
import { reserveSchema } from "@/schemas/reserveSchema"

interface reserveExtends extends reserveSchema{
    id:number,
    nameItem:string,
    dateReserve:string,
    dateReturn:string
}


export default function TableHistory(){
    async function fetchReserves(){
        const res = await API.get('/reserves')
        return res.data
    }

    const {data,isLoading,isError} = useQuery({
        queryKey:['reserves'],
        queryFn:fetchReserves
    })

    return(
         <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item Reservado</TableHead>
                        <TableHead>Data da Reserva</TableHead>
                        <TableHead>Data de Devolução</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Celular S20</TableCell>
                        <TableCell>25/06/2026</TableCell>
                        <TableCell>08/08/2026</TableCell>
                    </TableRow>
                    {isLoading &&
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">Carregando...</TableCell>
                        </TableRow>
                    }
                    {isError && 
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">Erro ao carregar reservas!</TableCell>
                        </TableRow>
                    }
                    {data?.lenght === 0 && 
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">Nenhuma reserva feita ainda</TableCell>
                        </TableRow>
                    }
                    {data?.map((reserve:reserveExtends) =>(
                        <TableRow key={reserve.id}>
                            <TableCell>{reserve.nameItem}</TableCell>
                            <TableCell>{reserve.dateReserve}</TableCell>
                            <TableCell>{reserve.dateReturn}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    )
}