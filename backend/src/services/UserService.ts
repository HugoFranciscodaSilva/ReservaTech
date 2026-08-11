import type { Role } from "../generated/prisma/enums.js"
import prisma from "../lib/prisma.js"


export const getUsersService = async () =>{
    return await prisma.user.findMany()
}

export const getUserService = async (id:Number) =>{
    return await prisma.user.findUnique({where:{id:Number(id)}})
}


export const postUserService = async (name:string,email:string,password:string,role:Role) =>{
    return await prisma.user.create({
        data:{
            name,
            email,
            password,
            role
        }
    })
}

export const patchUserService = async (id:number,name:string,email:string,password:string) =>{
    return await prisma.user.update({
        where:{
            id:id
        },
        data:{
            name,
            email,
            password
        }
    })
}

export const deleteUserService = async (id:number) =>{
    return await prisma.user.delete({where:{id}})
}