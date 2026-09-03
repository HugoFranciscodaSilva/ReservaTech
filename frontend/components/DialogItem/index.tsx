'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, buttonVariants } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { API } from "@/service/axios";
import { itemProps, itemSchema } from "@/schemas/itemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/store";
import { ArrowRight, Camera, Check, Gamepad2, Headset, Keyboard, Laptop, Monitor, Mouse, Package, Plus, PrinterCheck, Projector, RectangleGoggles, Smartphone, TabletSmartphone } from "lucide-react";

export  function DialogItem(){

    const icons = [
        {
            name:"laptop",
            component:<Laptop/>
        },
        {
            name:"smartphone",
            component:<Smartphone/>
        },
        {
            name:"tablet",
            component:<TabletSmartphone/>
        },
        {
            name:"monitor",
            component:<Monitor/>
        },
        {
            name:"camera",
            component:<Camera/>
        },
        {
            name:"vr",
            component:<RectangleGoggles/>
        },
        {
            name:"gamepad",
            component:<Gamepad2/>
        },
        {
            name:"headset",
            component:<Headset/>
        },
        {
            name:"keyboard",
            component:<Keyboard/>
        },
        {
            name:"mouse",
            component:<Mouse/>
        },
        {
            name:"printer",
            component:<PrinterCheck/>
        },
        {
            name:"projector",
            component:<Projector/>
        }
    ]

    const [open,setOpen] = useState<boolean>(false)

    async function CreateItem(data:itemSchema){
        return await API.post('/items',data)
    }
    const queryClient = useQueryClient()
    const {register,reset,formState: {errors},handleSubmit} = useForm<itemSchema>({resolver:zodResolver(itemProps),defaultValues:{reserved:"Disponivel"}})
    const {mutate, isPending} = useMutation({
        mutationFn:CreateItem,
        onSuccess:(data)=>{
            reset()
            queryClient.invalidateQueries({queryKey:['items']})
            alert(data.data.mensagem)
            setOpen(false)
        },
        onError:(error)=>{
            console.log(error)
        }
    })
    function Submit(data:itemSchema){
        console.log(data)
        mutate(data)
    }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={cn(buttonVariants({variant:"default"}),'bg-primaria hover:bg-hoverPrimaria py-6 px-5')}> <Plus/> Adicionar Equipamento</DialogTrigger>
            <DialogContent className={'bg-card border-2 border-borda sm:max-w-[40%] w-full flex flex-col gap-0 px-7 py-3'}>
                <div className="w-10 h-10 bg-secundaria/20 rounded justify-center items-center flex border-secundaria border">
                    <Package className="text-secundaria"/>
                </div>
                <h2 className="text-2xl text-textoPrincipal font-bold my-1">Adicionar Equipamento</h2>
                <p className="text-textoSecundario">Cadastre um novo dispositivo para disponibilizá-lo para reservas.</p>
                <form onSubmit={handleSubmit(Submit,(errors) => console.log(errors))}>
                    <div className={errors.name ? 'mb-1' : ''}>
                        <Label htmlFor="name" className="text-textoPrincipal text-xl">Nome do Equipamento</Label>
                        <Input className="border-secundaria border px-5 py-6 my-1 focus-visible:ring-2 focus-visible:ring-secundaria focus-visible:border-secundaria focus-visible:outline-none text-textoPrincipal bg-card" {...register("name")} id="name" placeholder="Ex: Notebook Dell" type="text"/>
                        {errors?.name && <span className="text-red-600">{errors.name.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl text-textoPrincipal">Icone do equipamento</h2>
                        <div className={`grid grid-cols-4 gap-3 w-full ${errors.icon ? 'mb-1' : ''}`}>
                            {icons.map(icon =>
                                <div key={icon.name} className="relative">
                                    <input {...register('icon')} value={icon.name} type="radio" name="icon" id={icon.name} className="sr-only peer"/>
                                    <label htmlFor={icon.name} className="p-5 border-2 border-borda text-textoPrincipal flex w-25 justify-center rounded-md peer-checked:bg-primaria/20 peer-checked:border-primaria
                                    peer-checked:text-primaria transition-all">
                                        {icon.component}
                                    </label>
                                    <Check className="bg-primaria text-textoPrincipal rounded-full w-6 h-6 absolute right-1 top-13 border-3 border-card hidden peer-checked:block"/>
                                </div>
                            )}
                            {errors?.icon && <span className="text-red-600 col-span-4 text-start">{errors.icon.message}</span>}
                        </div>
                        <p className="text-textoSecundario w-full">Selecione o icone que melhor representa este equipamento.</p>
                    </div>
                    <div className="w-full flex justify-around mt-2">
                        <DialogClose className={cn(buttonVariants({variant:"default"}),'border border-borda px-5 py-6 bg-transparent hover:bg-transparent')}>Cancelar</DialogClose>
                        <Button className={'bg-primaria hover:bg-hoverPrimaria px-5 py-6'} type="submit">{isPending ? 'Adicionando...' : 'Adicionar Equipamento'} <ArrowRight/></Button>
                    </div>
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

    if(!hasCompleted || user?.role !== "Administrador"){
        return null
    }

    return <DialogItem/>
}
