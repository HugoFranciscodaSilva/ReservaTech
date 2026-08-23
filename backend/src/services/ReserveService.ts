import type { createReserveDTO } from "../dtos/ReserveDTO.js"
import { ReserveNotFoundError } from "../errors/AppErrors.js"
import prisma from "../lib/prisma.js"
import type { patchReserveSchema } from "../schemas/ReserveSchema.js"


export const getReserveService = async ()=>{
    return await prisma.reserve.findMany({
        include:{
            user:{
                select:{
                    name:true
                }
            },
            item:{
                select:{
                    name:true
                }
            }
        }
    })
}

export const getReserveFromUserService = async (id:number)=>{
    return await prisma.reserve.findMany({
        where:{userId:id},
        include:{
            item:{
                select:{
                    name:true
                }
            }
        }
    })
}
export const postReserveService = async (data:createReserveDTO)=>{
    try {
        await prisma.item.update({
            where:{id:data.itemReserve},
            data:{
                reserved:"Reservado"
            }
        })
         return await prisma.reserve.create({
        data:{
            userId:data.studentReserve,
            itemId:data.itemReserve
        }
    })
    } catch (error) {
        throw error
    }
   
}
export const patchReserveService = async (data:patchReserveSchema,id:number)=>{

    const reserve = await prisma.reserve.findUnique({where:{id}})

    if(!reserve){
        throw new ReserveNotFoundError()
    }
    try {
        await prisma.item.update({
            where:{id:data.itemReserve},
            data:{
                reserved:"Disponivel"
            }
        })
        return await prisma.reserve.update({
        where:{id},
        data:{
            dateReturn:data.dateReturn
        }
    })
    } catch (error) {
        throw error
    }
    
}