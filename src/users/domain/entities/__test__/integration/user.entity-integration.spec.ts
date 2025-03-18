import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../../user.entity'
import { EntityValidationError } from '@/shared/errors/validation-error'

describe('UserEntity integration test', () => {
  describe('Constructor method', () => {
    it('should throw an error when creating a user with invalid name', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 's'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('should throw an error when creating a user with invalid email', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 's'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })
    it('should throw an error when creating a user with invalid password', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 's'.repeat(101),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('should throw an error when creating a user with invalid CreatedAt', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: '2025',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('Should a valid user', () => {
      const props: UserProps = {
        ...UserDataBuilder({}),
      }
      new UserEntity(props)
      expect.assertions(0)
    })
  })

  describe('Update Method', () => {
    it('should throw an error when update a user with invalid name', () => {
      const entity = new UserEntity(UserDataBuilder({}))
      expect(() => entity.updateName(null as any)).toThrow(
        EntityValidationError,
      )
      expect(() => entity.updateName('')).toThrow(EntityValidationError)
      expect(() => entity.updateName(10 as any)).toThrow(EntityValidationError)
      expect(() => entity.updateName('n'.repeat(256))).toThrow(
        EntityValidationError,
      )
    })

    it('Should a valid user', () => {
      const props: UserProps = {
        ...UserDataBuilder({}),
      }
      const entity = new UserEntity(props)
      entity.updateName('other name')
    })
  })

  describe('Update method', () => {
    it('should a invalid user using password field', () => {
      const entity = new UserEntity(UserDataBuilder({}))
      expect(() => entity.updatePassword(null as any)).toThrow(
        EntityValidationError,
      )
      expect(() => entity.updatePassword('')).toThrow(EntityValidationError)
      expect(() => entity.updatePassword(10 as any)).toThrow(
        EntityValidationError,
      )
      expect(() => entity.updatePassword('n'.repeat(101))).toThrow(
        EntityValidationError,
      )
    })
    it('Should a valid user', () => {
      const props: UserProps = {
        ...UserDataBuilder({}),
      }
      const entity = new UserEntity(props)
      entity.updatePassword('other password')
    })
  })
})
