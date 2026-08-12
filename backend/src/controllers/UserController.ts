import type {Request,Response} from 'express'
import { deleteUserService, getUserService, getUsersService, patchUserService, postUserService } from '../services/UserService.js'
import { UserSchema } from '../schemas/UserSchema.js'

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
        const formatedErros = result.error.issues.map(issue =>({
            campo:issue.path.join('.'),
            mensagem:issue.message
        }))
        return res.status(400).json({erro: "Dados invalidos!",detalhes:formatedErros})
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
    const {name,email,password} = req.body

    try {
        await patchUserService(Number(id),name,email,password)
        res.status(200).json({mensagem:"Usuario atualizado com sucesso!"})
    } catch (error) {
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
