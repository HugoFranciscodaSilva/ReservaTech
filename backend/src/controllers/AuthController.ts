import type { Request, Response } from "express";
import { AuthSchema } from "../schemas/AuthSchema.js";
import { authService } from "../services/AuthService.js";
import { AuthEmailOrPasswordError } from "../errors/AppErrors.js";

export const authController = async (req:Request,res:Response) => {
    const result = AuthSchema.safeParse(req.body)

    if(!result.success){
        const formatedErrors = result.error.issues.map(issue => ({
            campo:issue.path.join('.'),
            mensagem:issue.message
        }))

        return res.status(400).json({erro:"Dados invalidos!", detalhes: formatedErrors})
    }

    try {
        const token = await authService(result.data) 
        res.status(200).json({mensagem:"Login feito com sucesso!",token:token})
    } catch (error) {
        if(error instanceof AuthEmailOrPasswordError){
            res.status(401).json({mensagem:error.message})
        }
        console.log(error)
        res.status(500).json({mensagem:"Erro ao fazer login!"})
    }
}