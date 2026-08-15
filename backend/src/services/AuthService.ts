import type { authDTO } from "../dtos/AuthDTO.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from "../lib/prisma.js";
import { AuthEmailOrPasswordError } from "../errors/AppErrors.js";
import 'dotenv/config'

const SECRET_JWT = process.env.SECRET_JWT || ""

export const authService = async (data:authDTO) =>{
    const user = await prisma.user.findUnique({where:{email:data.email}})

    if(!user){
        throw new AuthEmailOrPasswordError()
    }

    const verifyPassword = await bcrypt.compare(data.password,user.password)

    if(!verifyPassword){
        throw new AuthEmailOrPasswordError()
    }

    const token = jwt.sign(
        {id:user.id,role:user.role},
        SECRET_JWT,
        {expiresIn:'1h'}
    )
    return token
}