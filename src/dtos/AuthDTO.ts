export interface authDTO{
    email:string,
    password:string
}

export interface TokenPayload{
    id:number
    name:string
    email: string
    role:"Aluno" | "Administrador"
}