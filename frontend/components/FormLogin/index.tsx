'use client'

import { useForm } from 'react-hook-form'
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { loginProps, loginSchema } from '@/schemas/loginSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API } from '@/service/axios';
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation';
import cookie from 'js-cookie'
import { useAuthStore } from '@/store/store';
import { useEffect, useState } from 'react';
import { ArrowRight, Eye, EyeClosed, Lock, Mail } from 'lucide-react';



export default function FormLogin(){

    const searchParams = useSearchParams()
    const errorTypes = searchParams.get('error')
    const [view,setView] = useState<boolean>(false)

    useEffect(()=>{
        if(errorTypes === 'unauthorized'){
            alert("Você precisa logar!")
            window.history.replaceState({},'','/')
        }
    },[errorTypes])

    const router = useRouter()
    const updateSession = useAuthStore((state)=> state.updateSession)
    const {register,handleSubmit,formState: {errors},reset} = useForm<loginSchema>({resolver:zodResolver(loginProps)})
    const queryClient = useQueryClient()
    async function Logar(data:loginSchema){
        return await API.post('/auth/login',data)
    }

    const {mutate,isPending} = useMutation({
        mutationFn:Logar,
        onSuccess:(data)=>{
            reset()
            queryClient.invalidateQueries({queryKey:['users']})
            alert(data.data.mensagem)
            const umaHora = new Date(new Date().getTime() + 60 * 60 * 1000)
            cookie.set('token',data.data.token,{expires:umaHora})
            updateSession()
            router.push('/dashboard')
        },
        onError:(error)=>{
            console.log(error)
        }
    })


    function Submit(data:loginSchema){
        mutate(data)
    }

    return(
        <form onSubmit={handleSubmit(Submit)} className='space-y-7'>
            <div className={`${errors?.email ? 'mb-2' : ''}`}>
                <Label htmlFor="email">Digite seu email:</Label>
                <div className='relative'>
                    <Mail className='absolute top-1/2 -translate-y-1/2 left-5 text-textoDesabilitado'/>
                    <Input className='p-8 px-13 focus-visible:ring-2 focus-visible:ring-primaria focus-visible:outline-none focus-visible:border-primaria' {...register('email')} type="email" id="email" placeholder="seu@email.com"/>
                </div>
                {errors?.email && <span className='text-red-600'>{errors.email.message}</span>}
            </div>
            <div className={errors?.password ? 'mb-2' : ''}>
                <Label htmlFor="password">Digite sua senha:</Label>
                <div className='relative'>
                    <Lock className='absolute top-1/2 -translate-y-1/2 left-5 text-textoDesabilitado'/>
                    <Input className='p-8 px-13 focus-visible:ring-2 focus-visible:ring-primaria focus-visible:outline-none focus-visible:border-primaria' {...register('password')} type={view ? 'text' : 'password'} id="password" placeholder="•••••••••"/>
                    <button onClick={() => setView(!view)} type='button' className='absolute top-1/2 -translate-y-1/2 right-5 text-textoDesabilitado cursor-pointer'>
                        {view ? <EyeClosed/> : <Eye/>}
                    </button>
                </div>
                {errors?.password && <span className='text-red-600'>{errors.password.message}</span>}
            </div>
            <Button type="submit" className={'w-full relative bg-primaria hover:bg-hoverPrimaria p-7'}>     {isPending ? 'Entrando...' : 'Entrar'}
                <ArrowRight className='absolute right-5 top-1/2 -translate-y-1/2'/>
            </Button>
        </form>
    )
}