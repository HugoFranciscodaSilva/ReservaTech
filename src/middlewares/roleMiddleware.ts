import type { NextFunction, Request, Response } from "express";
import type { TokenPayload } from "../dtos/AuthDTO.js";

interface  RequestExtends extends Request{
    user?:TokenPayload
}

export const  roleMiddleware = async (req:RequestExtends,res:Response,next:NextFunction)=>{
    if(req.user?.role !== "Administrador"){
        return res.status(401).json({mensagem:"Precisa ser administrador para fazer essa ação!"})
    }

    return next()
}