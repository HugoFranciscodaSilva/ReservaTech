'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, buttonVariants } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { API } from "@/service/axios";
import { itemProps, itemSchema } from "@/schemas/itemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/store";

export  function DialogItem(){

    async function CreateItem(data:itemSchema){
        return await API.post('/items',data)
    }
    const queryClient = useQueryClient()
    const {register,reset,formState: {errors},handleSubmit} = useForm<itemSchema>({resolver:zodResolver(itemProps)})
    const {mutate, isPending} = useMutation({
        mutationFn:CreateItem,
        onSuccess:(data)=>{
            reset()
            queryClient.invalidateQueries({queryKey:['items']})
            alert(data.data.mensagem)
        },
        onError:(error)=>{
            console.log(error)
        }
    })
    function Submit(data:itemSchema){
        mutate(data)
    }

    return(
        <Dialog>
            <DialogTrigger className={cn(buttonVariants({variant:"default"}),'absolute top-2 left-8')}>Adicionar Item</DialogTrigger>
            <DialogContent>
                <h2>Novo Item</h2>
                <form onSubmit={handleSubmit(Submit)}>
                    <div className={errors.name ? 'mb-2' : ''}>
                        <Label htmlFor="name">Nome do item:</Label>
                        <Input {...register("name")} id="name" placeholder="Ex: Notebook Dell" type="text"/>
                        {errors?.name && <span className="text-red-600">{errors.name.message}</span>}
                    </div>
                    <Button type="submit">{isPending ? 'Adicionando...' : 'Adicionar'}</Button>
                </form>
            </DialogContent>
        </Dialog>
    )

}

export function AddItem(){
    const [hasCompleted, setHasCompleted] = useState<boolean>(false)
    const user = useAuthStore((state)=> state.userInfo.user)

    useEffect(()=>{
        setHasCompleted(true)
    },[])

    if(!hasCompleted || !user?.role){
        return null
    }

    return <DialogItem/>
}
