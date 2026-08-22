import z from "zod";

export const reserveProps = z.object({
    userId:z.number(),
    itemId:z.number()
})

export type reserveSchema = z.infer<typeof reserveProps>


export interface reserveExtends extends reserveSchema{
    id:number,
    item:{name:string},
    user:{name:string},
    dateReserve:string,
    dateReturn:string
}