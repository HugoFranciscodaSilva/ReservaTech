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
import { useEffect } from 'react';



export default function FormLogin(){

    const searchParams = useSearchParams()
    const errorTypes = searchParams.get('error')

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
            updateSession
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
        <form onSubmit={handleSubmit(Submit)}>
            <div className={errors?.email ? 'mb-2' : ''}>
                <Label htmlFor="email">Digite seu email:</Label>
                <Input {...register('email')} type="email" id="email" placeholder="exemplo@exemplo.com"/>
                {errors?.email && <span className='text-red-600'>{errors.email.message}</span>}
            </div>
            <div className={errors?.password ? 'mb-2' : ''}>
                <Label htmlFor="password">Digite sua senha:</Label>
                <Input {...register('password')} type="password" id="password" placeholder="•••••••••"/>
                {errors?.password && <span className='text-red-600'>{errors.password.message}</span>}
            </div>
            <Button type="submit" className={'w-full'}>{isPending ? 'Entrando...' : 'Entrar'}</Button>
        </form>
    )
}