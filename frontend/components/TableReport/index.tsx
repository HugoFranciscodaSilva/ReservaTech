'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { API } from "@/service/axios";
import { reserveExtends } from "@/schemas/reserveSchema";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function TableReport(){

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
                    <TableHead>Quem reservou</TableHead>
                    <TableHead>Item Reservado</TableHead>
                    <TableHead>Data da Reserva</TableHead>
                    <TableHead>Data de Devolução</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading &&
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">Carregando...</TableCell>
                    </TableRow>
                }
                {isError && 
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">Erro ao carregar reservas!</TableCell>
                    </TableRow>
                }
                {data?.length === 0 && 
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">Nenhuma reserva feita ainda</TableCell>
                    </TableRow>
                }
                {data?.map((reserves:reserveExtends) =>(
                    <TableRow key={reserves.id}>
                        <TableCell>{reserves.user.name}</TableCell>
                        <TableCell>{reserves.item.name}</TableCell>
                        <TableCell>{format(reserves.dateReserve,'dd/MM/yyyy',{locale:ptBR})}</TableCell>
                        <TableCell>{reserves.dateReturn ? format(reserves.dateReserve,'dd//MM/yyyy',{locale:ptBR}) : 'Não devolvido'}</TableCell>
                        <TableCell>
                            {!reserves.dateReturn && 
                                <Button onClick={()=> patchReserve(reserves.id)}>Devolver</Button>
                            }
                            {reserves.dateReturn && 'Devolvido'}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}