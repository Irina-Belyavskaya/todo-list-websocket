import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { RegistrationDto } from './dtos/registration.dto'
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dtos/login.dto'
import { Payload } from './dtos/payload.dto'
import { SecurityService } from 'src/security/security.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly securityService: SecurityService
  ) { }
  async registration(dto: RegistrationDto) {
    const user = await this.usersService.getUserByEmail(dto.email)
    if (user) {
      throw new BadRequestException('Invalid login or password')
    }

    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Invalid login or password')
    }

    const hashPassword = await bcrypt.hash(dto.password, 10)
    const newUser = await this.usersService.createUser({
      ...dto, password: hashPassword
    })
    const payload = { email: newUser.email, id: newUser.id };
    return this.securityService.generateToken(payload);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('Invalid login or password');
    }
    const payload = { email: user.email, id: user.id };
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (isMatch) {
      return this.securityService.generateToken(payload);
    }
    throw new BadRequestException('Invalid login or password');
  }

  async validateUser(payload: Payload) {
    const user = await this.usersService.getUserByEmail(payload.email);
    if (user) {
      return user;
    }
    throw new BadRequestException(('Invalid login or password'));
  }
}
