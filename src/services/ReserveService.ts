import type { createReserveDTO } from "../dtos/ReserveDTO.js"
import { ReserveNotFoundError } from "../errors/AppErrors.js"
import prisma from "../lib/prisma.js"
import type { patchReserveSchema } from "../schemas/ReserveSchema.js"


export const getReserveService = async ()=>{
    return await prisma.reserve.findMany()
}
export const postReserveService = async (data:createReserveDTO)=>{
    return await prisma.reserve.create({
        data:{
            userId:data.studentReserve,
            itemId:data.itemReserve
        }
    })
}
export const patchReserveService = async (data:patchReserveSchema,id:number)=>{

    const reserve = await prisma.reserve.findUnique({where:{id}})

    if(!reserve){
        throw new ReserveNotFoundError()
    }

    return await prisma.reserve.update({
        where:{id},
        data:{
            dateReturn:data.dateReturn
        }
    })
}