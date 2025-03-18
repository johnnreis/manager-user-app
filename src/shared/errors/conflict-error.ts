export class ConflictError extends Error {
  constructor(messsage: string) {
    super(messsage)
    this.name = 'ConflictError'
  }
}
