'use client'

import { API } from "@/service/axios"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { reserveExtends, reserveSchema } from "@/schemas/reserveSchema"
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from "../ui/button"

export default function TableHistory(){

    const queryClient = useQueryClient()

    async function patchReserve(itemId:number){
        try {
            await API.patch(`/reserves/${itemId}`,{
                itemReserve:itemId,
                dateReturn:new Date().toISOString()
            })
            queryClient.invalidateQueries({queryKey:['items']})
            queryClient.invalidateQueries({queryKey:['reserves']})
            alert("Item devolvido com sucesso!")
        } catch (error) {
            console.log(error)
        }
       
    }
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
                    {data?.length === 0 && 
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">Nenhuma reserva feita ainda</TableCell>
                        </TableRow>
                    }
                    {data?.map((reserve:reserveExtends) =>(
                        <TableRow key={reserve.id}>
                            <TableCell>{reserve.item.name}</TableCell>
                            <TableCell>{format(reserve.dateReserve,'dd/MM/yyyy',{locale:ptBR})}</TableCell>
                            <TableCell>{reserve.dateReturn ? format(reserve.dateReturn,'dd/MM/yyyy',{locale:ptBR}) : 'Não foi devolvido'}</TableCell>
                            <TableCell>
                                {!reserve.dateReturn && 
                                    <Button onClick={()=> patchReserve(reserve.id)}>Devolver</Button>
                                }
                                {reserve.dateReturn && 'Devolvido'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    )
}