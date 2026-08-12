import prisma from "../lib/prisma.js"
import bcrypt from 'bcrypt'

interface UserDTO{
    id:number,
    name:string,
    email:string,
    password:string,
    role?:"Aluno" | "Administrador" | undefined
}


export const getUsersService = async () =>{
    return await prisma.user.findMany({select:{
        id:true,
        name:true,
        email:true,
        role:true
    }})
}

export const getUserService = async (id:Number) =>{
    return await prisma.user.findUnique({
        where:{id:Number(id)},
        select:{
        id:true,
        name:true,
        email:true,
        role:true
    }})
}


export const postUserService = async (data:UserDTO) =>{

    const passwordHashed = await bcrypt.hash(data.password,10)

    return await prisma.user.create({
        data:{
            name:data.name,
            email:data.email,
            password:passwordHashed,
            role:data.role
        }
    })
}

export const patchUserService = async (data:UserDTO) =>{

    const user = await prisma.user.findUnique({where:{id:data.id}})

    if(!user){
        
    }

    const passwordHashed = await bcrypt.hash(data.password,10)

    return await prisma.user.update({
        where:{
            id:data.id
        },
        data:{
            name:data.name,
            email:data.email,
            password:passwordHashed
        }
    })
}

export const deleteUserService = async (id:number) =>{
    return await prisma.user.delete({where:{id}})
}