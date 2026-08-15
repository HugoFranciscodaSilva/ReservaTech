import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import type { TokenPayload } from "../dtos/AuthDTO.js";

interface RequestExtends extends Request{
    user?:TokenPayload
}
const SECRET_JWT = process.env.SECRET_JWT || ""

export const authMiddleware = async (req:RequestExtends,res:Response,next:NextFunction) =>{
    const authHeader  = req.headers.authorization

    if(!authHeader){
        return res.status(400).json({mensagem:"Token não fornecido!"})
    }

    const [schema,token] = authHeader.split(' ')

    if(!token || schema !== 'Bearer'){
        return res.status(400).json({mensagem:"Token mal formatado!"})
    }

    try {
        const decode = jwt.verify(token,SECRET_JWT) as TokenPayload
        req.user = decode
        return next()
    } catch (error) {
        res.status(401).json({mensagem:"Token invalido ou expirado!"})
    }
}