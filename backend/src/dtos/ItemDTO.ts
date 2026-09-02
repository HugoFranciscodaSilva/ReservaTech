export interface ItemDTO{
    id:number,
    name:string,
    icon:string
}

export type createItemDTO = Omit<ItemDTO, 'id'>