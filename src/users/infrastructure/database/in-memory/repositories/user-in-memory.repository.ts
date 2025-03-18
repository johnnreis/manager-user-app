import { InMemoryRepository } from '@/shared/domain/repository/in-memory.repository'
import { ConflictError } from '@/shared/errors/conflict-error'
import { NotFoundError } from '@/shared/errors/not-found-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepository } from '@/users/domain/repository/user.repostory'

export class UserInMemoryRepository
  extends InMemoryRepository<UserEntity>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email)
    if (!entity) {
      throw new NotFoundError(`Entity not found using email ${email}`)
    }
    return Promise.resolve(entity)
  }
  emailExists(email: string): Promise<void> {
    const entity = this.items.find(item => item.email === email)
    if (entity) {
      throw new ConflictError('Email address already used')
    }
    return Promise.resolve()
  }
}
