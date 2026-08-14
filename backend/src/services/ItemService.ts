import type { createItemDTO } from "../dtos/ItemDTO.js"
import { ItemNotFoundError } from "../errors/AppErrors.js"
import prisma from "../lib/prisma.js"
import type { ItemSchemaType } from "../schemas/ItemSchema.js"

export const getItemService = async ()=>{
    return await prisma.item.findMany()
}

export const postItemService = async (data:createItemDTO)=>{
    return await prisma.item.create({data})
}

export const patchItemService = async (data:ItemSchemaType,id:number)=>{

    const item = await prisma.item.findUnique({where:{id}})

    if(!item){
        throw new ItemNotFoundError()
    }

    return prisma.item.update({
        where:{id},
        data:data
    })
}

export const deleteItemService = async (id:number)=>{
    return prisma.item.delete({where:{id}})
}