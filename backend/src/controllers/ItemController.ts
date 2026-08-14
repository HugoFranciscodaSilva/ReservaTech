import type { Request, Response } from "express"
import { deleteItemService, getItemService, patchItemService, postItemService } from "../services/ItemService.js"
import { ItemSchema } from "../schemas/ItemSchema.js"
import { ItemNotFoundError } from "../errors/AppErrors.js"

export const getItemController = async (req:Request,res:Response)=>{
    try {
        const items = await getItemService()
        res.status(200).json(items)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao listar itens!"})
    }
}


export const postItemController = async (req:Request,res:Response)=>{
    const result = ItemSchema.safeParse(req.body)

    if(!result.success){
        const formatedErrors = result.error.issues.map(issue => ({
            campo:issue.path.join('.'),
            mensagem:issue.message
        }))
        return res.status(400).json({error:"Dados invalidos",formatedErrors})
    }

    try {

        await postItemService(result.data)
        res.status(201).json({mensagem:"Item criado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao criar item!"})
    }
}

export const patchItemController = async (req:Request,res:Response)=>{
    const { id } = req.params
    const result = ItemSchema.safeParse(req.body)

    if(!result.success){
        const formatedErrors = result.error.issues.map(issue => ({
            mensagem:"Preencha ao menos 1 campo!"
        }))

        return res.status(400).json(formatedErrors)
    }

    try {
        await patchItemService(result.data,Number(id))
        res.status(200).json({mensagem:"Item atualizado com sucesso!"})
    } catch (error) {
        if(error instanceof ItemNotFoundError){
            return res.status(404).json({mensagem:error.message})
        }
        console.log(error)
        res.status(500).json({mensagem:"Erro ao atualizar item!"})
    }

}

export const deleteItemController = async (req:Request,res:Response)=>{
    const { id } = req.params

    try {
        await deleteItemService(Number(id))
        res.end(204)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao deletar item!"})
    }
}