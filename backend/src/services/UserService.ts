import type { createUserDTO  } from "../dtos/UserDTO.js"
import { UserNotFoundError } from "../errors/AppErrors.js"
import type { Prisma } from "../generated/prisma/client.js"
import prisma from "../lib/prisma.js"
import bcrypt from 'bcrypt'
import type { UpdateUserDTO } from "../schemas/UserSchema.js"


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


export const postUserService = async (data:createUserDTO) =>{

    const passwordHashed = await bcrypt.hash(data.password,10)

    return await prisma.user.create({
        data:{
            name:data.name,
            email:data.email,
            password:passwordHashed,
            role:data.role ?? "Aluno"
        }
    })
}

export const patchUserService = async (data:UpdateUserDTO,id:number) =>{

    const user = await prisma.user.findUnique({where:{id}})

    if(!user){
      throw new UserNotFoundError()  
    }

    const updateData:Prisma.UserUpdateInput = {}

    if(data.email){
        updateData.email = data.email
    }

    if(data.name){
        updateData.name = data.name
    }

    if(data.password){
        updateData.password =  await bcrypt.hash(data.password,10)
    }

    return await prisma.user.update({
        where:{id},
        data:{updateData}
    })
}

export const deleteUserService = async (id:number) =>{
    return await prisma.user.delete({where:{id}})
}