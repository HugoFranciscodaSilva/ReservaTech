import type { Request, Response } from "express";
import { getReserveFromUserService, getReserveService, patchReserveService, postReserveService } from "../services/ReserveService.js";
import {  patchReserveProps, ReserveSchema } from "../schemas/ReserveSchema.js";
import { ReserveNotFoundError } from "../errors/AppErrors.js";

export const getReserveController = async (req:Request,res:Response) =>{
    try {
        const reservas = await getReserveService()
        res.status(200).json(reservas)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao listar reservas!"})
    }
}

export const getReserveFromUserController = async (req:Request,res:Response) =>{
    const { id } = req.params

    try {
        const reserves = await getReserveFromUserService(Number(id))
        res.status(200).json(reserves) 
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao listar reservas!"})
    }
}

export const postReserveController = async (req:Request,res:Response) =>{
    const result = ReserveSchema.safeParse(req.body)

    if(!result.success){
        const formatedErrors = result.error.issues.map(issue => ({
            campo:issue.path.join('.'),
            mensagem:issue.message
        }))
        return res.status(400).json({error:"Dados invalidos",detalhes:formatedErrors})
    }

    try {
        await postReserveService(result.data)
        res.status(201).json({mensagem:"Reserva feita!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao fazer reserva!"})
    }
}

export const patchReserveController = async (req:Request,res:Response) =>{
    const { id } = req.params
    const result = patchReserveProps.safeParse(req.body)

    if(!result.success){
        const formatedErrors = result.error.issues.map(issue => ({
            mensagem:"Preencha ao menos um campo!"
        }))

        return res.status(400).json(formatedErrors)
    }

    try {
        await patchReserveService(result.data,Number(id))
        res.status(200).json({mensagem:"Reserva atualizada com sucesso!"})
    } catch (error) {
        if(error instanceof ReserveNotFoundError){
            return res.status(404).json({mensagem:error.message})
        }
        console.log(error)
        res.status(500).json({mensagem:"Erro ao atualizar reserva!"})
    }
}