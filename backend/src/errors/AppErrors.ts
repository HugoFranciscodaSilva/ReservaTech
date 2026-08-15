export class UserNotFoundError extends Error{
    public readonly StatusCode: Number

    constructor(message = "Usuario não encontrado!"){
        super(message)
        this.name = "UserNotFoundError"
        this.StatusCode = 404
    }
}

export class ItemNotFoundError extends Error{
    public readonly StatusCodes:Number

    constructor(message = "Item não encontrado!"){
        super(message)
        this.name = 'ItemNotFoundError'
        this.StatusCodes = 404
    }
}

export class ReserveNotFoundError extends Error{
    public readonly StatusCode:number

    constructor(message = "Reserva não existe!"){
        super(message)
        this.name = 'ReserveNotFoundError'
        this.StatusCode = 404
    }
}

export class AuthEmailOrPasswordError extends Error{
    public readonly StatusCode:number

    constructor(message = "Email ou senha incorretos!"){
        super(message)
        this.name = 'AuthEmailOrPasswordError'
        this.StatusCode = 401
    }
}