import z from 'zod'

export const loginProps = z.object({
    email:z.string().email("O email é obrigatório!"),
    password:z.string({message:"A senha é obrigatória!"}).min(4,"A senha deve ter ao menos 4 caracteres!")
})

export type loginSchema = z.infer<typeof loginProps>