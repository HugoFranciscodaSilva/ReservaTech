import z from 'zod'

export const UserSchema = z.object({
    name: z.string({error:"O nome é obrigatório!"}).min(3,"O nome precisa ter no minimo 3 caracteres!"),
    email:z.email("Formato de email invalido!"),
    password:z.string({error:"A senha é obrigatória!"}).min(6,"A senha precisa ter ao menos 6 caracteres!"),
    role:z.enum(['Aluno','Administrador'],{error:"Insira um cargo valido!"}).optional()
})