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
                        <TableHead className="rounded-tl-md px-10 py-5 bg-card text-textoSecundario border-y-2 border-l-2 border-borda">EQUIPAMENTO</TableHead>
                        <TableHead className="px-10 py-5 bg-card text-textoSecundario border-y-2  border-borda">DATA DA RESERVA</TableHead>
                        <TableHead className="px-10 py-5 bg-card text-textoSecundario border-y-2  border-borda">DEVOLUÇÃO</TableHead>
                        <TableHead className="px-10 py-5 bg-card text-textoSecundario border-y-2  border-borda">STATUS</TableHead>
                        <TableHead className="rounded-tr-md px-10 py-5 bg-card text-textoSecundario border-y-2 border-r-2 border-borda w-[20%]">AÇÕES</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading &&
                        <TableRow>
                            <TableCell colSpan={5} className="bg-fundoSecundairo text-textoPrincipal px-10 py-5 border-y-2 border-l-2 border-borda text-center">Carregando...</TableCell>
                        </TableRow>
                    }
                    {isError && 
                        <TableRow>
                            <TableCell colSpan={5} className="bg-fundoSecundairo text-textoPrincipal px-10 py-5 border-y-2 border-l-2 border-borda text-center">Erro ao carregar reservas!</TableCell>
                        </TableRow>
                    }
                    {data?.length === 0 && 
                        <TableRow>
                            <TableCell colSpan={5} className="bg-fundoSecundairo text-textoPrincipal px-10 py-5 border-y-2 border-l-2 border-borda text-center">Nenhuma reserva feita ainda</TableCell>
                        </TableRow>
                    }
                    {data?.map((reserve:reserveExtends) =>(
                        <TableRow key={reserve.id}>
                            <TableCell className="bg-fundoSecundairo text-textoPrincipal px-10 py-5 border-y-2 border-l-2 border-borda">{reserve.item.name}</TableCell>
                            <TableCell className="bg-fundoSecundairo text-textoPrincipal px-10 py-5 border-y-2 border-borda">{format(reserve.dateReserve,'dd/MM/yyyy',{locale:ptBR})}</TableCell>
                            <TableCell className="bg-fundoSecundairo text-textoPrincipal px-10 py-5 border-y-2 border-borda">{reserve.dateReturn ? format(reserve.dateReturn,'dd/MM/yyyy',{locale:ptBR}) : 'Não foi devolvido'}</TableCell>
                            <TableCell className="bg-fundoSecundairo text-textoPrincipal px-10 py-5 border-y-2 border-r-2 border-borda">
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