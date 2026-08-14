export class UserNotFoundError extends Error{
    public readonly StatusCode: Number

    constructor(message = "Usuario não encontrado!"){
        super(message)
        this.name = "UserNotFoundError"
        this.StatusCode = 404
    }
}