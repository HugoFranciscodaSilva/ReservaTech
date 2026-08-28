'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { API } from "@/service/axios";
import { itemSchema } from "@/schemas/itemSchema";
import { useAuthStore } from "@/store/store";
import { ArrowRight, LockKeyhole } from "lucide-react";

interface itemProps extends itemSchema{
    id:number,
    name:string,
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
                        <TableHead className="rounded-tl-md px-10 py-5 bg-card text-textoSecundario border-y-2 border-l-2 border-borda">EQUIPAMENTO</TableHead>
                        <TableHead className="px-10 py-5 bg-card text-textoSecundario border-y-2  border-borda">STATUS</TableHead>
                        <TableHead className="rounded-tr-md px-10 py-5 bg-card text-textoSecundario border-y-2 border-r-2 border-borda w-[20%]">AÇÕES</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isError &&
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">Erro ao carregar itens.</TableCell>
                        </TableRow>
                    }
                    {isLoading &&
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">Carregando itens...</TableCell>
                        </TableRow>
                    }
                    {data?.length === 0 &&
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">Não há itens.</TableCell>
                        </TableRow>
                    }
                    {data?.map((item:itemProps)=>
                    <TableRow key={item.id}>
                        <TableCell className="bg-fundoPrincipal text-textoPrincipal px-10 py-5 border-y-2 border-l-2 border-borda">{item.name}</TableCell>
                        <TableCell className="bg-fundoPrincipal text-textoPrincipal px-10 py-5 border-y-2 border-borda">
                            {item.reserved === "Disponivel" &&
                             <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-secundaria rounded-full"></div>
                                <span className="text-secundaria">{item.reserved}</span>
                            </div>}
                            {item.reserved === "Reservado" &&
                             <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-primaria rounded-full"></div>
                                <span className="text-primaria">{item.reserved}</span>
                            </div>
                             }
                        </TableCell>
                        <TableCell  className="bg-fundoPrincipal text-textoPrincipal px-10 py-5 border-y-2 border-r-2 border-borda">
                            {item.reserved == "Reservado" && <Button className={'w-[80%] bg-fundoPrincipal border-2 border-borda px-8 py-6 flex items-center justify-between'} disabled> <LockKeyhole className="text-textoDesabilitado"/> Reservado</Button>}
                            {item.reserved == "Disponivel" && <Button className={'w-[80%] bg-primaria px-8 py-6 flex items-center justify-between hover:bg-hoverPrimaria'} onClick={() => createReserve(user?.id,item.id)}>Reservar <ArrowRight/> </Button>}
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
    )
}
