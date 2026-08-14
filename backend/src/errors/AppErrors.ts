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