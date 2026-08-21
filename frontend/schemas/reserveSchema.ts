import z from "zod";

export const reserveProps = z.object({
    userId:z.number(),
    itemId:z.number()
})

export type reserveSchema = z.infer<typeof reserveProps>