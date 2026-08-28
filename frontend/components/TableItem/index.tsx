'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { API } from "@/service/axios";
import { itemSchema } from "@/schemas/itemSchema";
import { useAuthStore } from "@/store/store";

interface itemProps extends itemSchema{
    id:number,
    name:string
}

export default function TableItem(){

    const user = useAuthStore((state) => state.userInfo.user)
    const queryClient = useQueryClient()
    async function createReserve(userId:number | undefined,itemId:number){
        try {
            await API.post('/reserves',{
                studentReserve:userId,
                itemReserve:itemId
            })
            queryClient.invalidateQueries({queryKey:['items']})
            alert("Item reservado com sucesso!")
        } catch (error) {
            console.log(error)
        }
    }

    async function fecthItems(){
        const res = await API.get('/items')
        return res.data
    }
    const {data,isLoading,isError} = useQuery<itemProps[]>({
        queryKey:['items'],
        queryFn:fecthItems
    })

    return(
        <Table className="w-full m-auto my-3">
                <TableHeader>
                    <TableRow>
                        <TableHead className="rounded-tl-md">Nome do Dispositivo</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="rounded-tr-md">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isError &&
                        <TableRow>
                            <TableCell colSpan={2} className="text-center">Erro ao carregar itens.</TableCell>
                        </TableRow>
                    }
                    {isLoading &&
                        <TableRow>
                            <TableCell colSpan={2} className="text-center">Carregando itens...</TableCell>
                        </TableRow>
                    }
                    {data?.length === 0 &&
                        <TableRow>
                            <TableCell colSpan={2} className="text-center">Não há itens.</TableCell>
                        </TableRow>
                    }
                    {data?.map((item:itemProps)=>
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                            {item.reserved == "Reservado" && 'Reservado'}
                            {item.reserved == "Disponivel" && <Button onClick={() => createReserve(user?.id,item.id)}>Reservar</Button>}
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
    )
}
