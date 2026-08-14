import z from "zod";

export const ReserveSchema = z.object({
    itemReserve:z.coerce.number({error:"O id do item reservado é obrigatório!"}),
    studentReserve:z.coerce.number({error:"O id do aluno que fez a reserva é obrigatório!"})
})

export const patchReserveProps = z.object({
    dateReturn:z.coerce.date()
})

export type patchReserveSchema = z.infer<typeof patchReserveProps>