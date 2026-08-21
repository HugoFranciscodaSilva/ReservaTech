import z from "zod";

export const itemProps = z.object({
    name:z.string({message:"Nome obrigatório!"}).min(4,'Minimo de 4 caracteres!')
})

export type itemSchema = z.infer<typeof itemProps>