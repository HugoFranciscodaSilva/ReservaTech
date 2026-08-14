import type {Request,Response} from 'express'
import { deleteUserService, getUserService, getUsersService, patchUserService, postUserService } from '../services/UserService.js'
import { UserSchema } from '../schemas/UserSchema.js'
import { UserNotFoundError } from '../errors/AppErrors.js'

export const getUsersController = async (req:Request,res:Response) =>{
    try{
        const users = await getUsersService()
        res.status(200).json(users)
    }catch(error){
        console.log(error)
        res.status(500).json({mensagem:"Erro ao listar usuarios!"})
    }
}

export const getUserController = async (req:Request,res:Response) =>{
    const { id } = req.params

    try {
        const user = await getUserService(Number(id))
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao listar usuario!"})
    }
}

export const postUserController = async (req:Request,res:Response) =>{
    const result = UserSchema.safeParse(req.body) 

    if(!result.success){
        const formatedErrors = result.error.issues.map(issue =>({
            campo:issue.path.join('.'),
            mensagem:issue.message
        }))
        return res.status(400).json({erro: "Dados invalidos!",detalhes:formatedErrors})
    }


    try {
        await postUserService(result.data)
        res.status(201).json({mensagem:"Usuario criado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao criar usuario!"})
    }
}


export const patchUserController = async (req:Request,res:Response) =>{
    const { id } = req.params
    const result = UserSchema.safeParse(req.body)

    if(!result.success){
        const formatedErrors = result.error.issues.map(issue =>({
            mensagem: "Preencha ao menos um campo!"
        }))

        return res.status(400).json(formatedErrors)
    }

    try {
        await patchUserService(result.data,Number(id))
        res.status(200).json({mensagem:"Usuario atualizado com sucesso!"})
    } catch (error) {
        if(error instanceof UserNotFoundError){
            res.status(404).json({mensagem:error.message})
        }
        console.log(error)
        res.status(500).json({mensagem:"Erro ao atualizar usuario!"})
    }
}


export const deleteUserController = async (req:Request,res:Response) =>{
    const { id } = req.params

    try {
        await deleteUserService(Number(id))
        res.end(204)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao deletar usuario!"})
    }
}
