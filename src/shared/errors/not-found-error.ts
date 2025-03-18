export class NotFoundError extends Error {
  constructor(messsage: string) {
    super(messsage)
    this.name = 'NotFoundError'
  }
}
