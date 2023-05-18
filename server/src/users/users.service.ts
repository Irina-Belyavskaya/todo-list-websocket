import { Inject, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './models/user.model'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) {}

  async getUsers() {
    return await this.usersRepository.findAll()
  }

  async getUserById(id: number) {
    return await this.usersRepository.findOne({ where: {id} })
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: {email} })
  }

  async createUser(dto: CreateUserDto) {
    return await this.usersRepository.create(dto)
  }

  async deleteUser(id: number) {
    return await this.usersRepository.destroy({ where: { id } })
  }
}
