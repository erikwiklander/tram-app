export class ServerError {
    constructor(public status: number, public error: string, public message: string) {}
}
