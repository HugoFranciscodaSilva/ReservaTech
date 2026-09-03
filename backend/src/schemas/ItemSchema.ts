import z from "zod";


export const ItemSchema = z.object({
    name:z.string({error:"O nome é obrigatório!"}).min(4,"O nome precisa ter ao menos 4 caracteres!"),
    icon:z.string({error:"Selecione um icone"})
})

export type ItemSchemaType = z.infer<typeof ItemSchema>