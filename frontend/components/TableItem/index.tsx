'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { API } from "@/service/axios";
import { itemSchema } from "@/schemas/itemSchema";
import { useAuthStore } from "@/store/store";
import { ArrowRight, Camera, Gamepad2, Headset, Keyboard, Laptop, LockKeyhole, Monitor, Mouse, Printer, Projector, RectangleGoggles, Smartphone, TabletSmartphone } from "lucide-react";
import { ReactNode } from "react";

interface itemProps extends itemSchema{
    id:number,
    name:string,
}

export default function TableItem(){

    const iconMap:Record<string, ReactNode> = {
        laptop:<Laptop/>,
        smartphone:<Smartphone/>,
        tablet:<TabletSmartphone/>,
        monitor:<Monitor/>,
        camera:<Camera/>,
        vr:<RectangleGoggles/>,
        gamepad:<Gamepad2/>,
        headset:<Headset/>,
        keyboard:<Keyboard/>,
        mouse:<Mouse/>,
        printer:<Printer/>,
        projector:<Projector/>
    }

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
                            <TableCell colSpan={3} className="bg-fundoSecundairo text-textoPrincipal px-10 py-5 border-y-2 border-l-2 border-borda text-center">Erro ao carregar itens.</TableCell>
                        </TableRow>
                    }
                    {isLoading &&
                        <TableRow>
                            <TableCell colSpan={3} className="bg-fundoSecundairo text-textoPrincipal px-10 py-5 border-y-2 border-l-2 border-borda text-center">Carregando itens...</TableCell>
                        </TableRow>
                    }
                    {data?.length === 0 &&
                        <TableRow>
                            <TableCell colSpan={3} className="bg-fundoSecundairo text-textoPrincipal px-10 py-5 border-y-2 border-l-2 border-borda text-center">Não há itens.</TableCell>
                        </TableRow>
                    }
                    {data?.map((item:itemProps)=>
                    <TableRow key={item.id}>
                        <TableCell className="bg-fundoSecundairo text-textoPrincipal px-10 py-5 border-y-2 border-l-2 border-borda">
                            <div className="flex items-center space-x-7">
                                <div className={`${item.reserved === "Disponivel" ? "bg-secundaria/20 border-secundaria text-secundaria" : "bg-primaria/20 border-primaria text-primaria"} border rounded-md w-15 h-15 flex items-center justify-center`}>
                                    {iconMap[item.icon]}
                                </div>
                                <p className="text-lg">{item.name}</p>
                            </div>
                        </TableCell>
                        <TableCell className="bg-fundoSecundairo text-textoPrincipal px-10 py-5 border-y-2 border-borda">
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
                        <TableCell  className="bg-fundoSecundairo text-textoPrincipal px-10 py-5 border-y-2 border-r-2 border-borda">
                            {item.reserved == "Reservado" && <Button className={'w-[80%] bg-fundoPrincipal border-2 border-borda px-8 py-6 flex items-center '} disabled> <LockKeyhole className="text-textoDesabilitado"/> Reservado</Button>}
                            {item.reserved == "Disponivel" && <Button className={'w-[80%] bg-primaria px-8 py-6 flex items-center justify-between hover:bg-hoverPrimaria'} onClick={() => createReserve(user?.id,item.id)}>Reservar <ArrowRight/> </Button>}
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
    )
}
