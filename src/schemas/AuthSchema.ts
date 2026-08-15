import z from "zod";

export const AuthSchema = z.object({
    email:z.email({error:"O email é obrigatório!"}),
    password:z.string({error:"A senha é obrigatória"})
})