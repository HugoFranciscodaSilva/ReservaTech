interface ReserveDTO{
    id:number,
    itemReserve:number,
    studentReserve:number,
    dateReserve:Date,
    dateReturn:Date
}

export type createReserveDTO = Omit<ReserveDTO,"id" | "dateReturn" | "dateReserve">