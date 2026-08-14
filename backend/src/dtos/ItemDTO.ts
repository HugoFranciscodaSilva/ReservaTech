export interface ItemDTO{
    id:number,
    name:string
}

export type createItemDTO = Omit<ItemDTO, 'id'>