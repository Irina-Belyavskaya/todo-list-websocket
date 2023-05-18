import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserSessionDto } from './dtos/userSession.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class SecurityService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) { }

  public async getUserById(userId: number) {
    return await this.usersService.getUserById(userId);
  }

  async generateToken(user) {
    const payload = UserSessionDto.fromPayload(user);

    return {
      access_token: this.jwtService.sign(payload),
      expired_at: (Number(new Date().getTime()) + 3600000)
    }
  }

  public async checkJwtToken(authHeader: string) {
    if (!authHeader) {
      return false;
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if(bearer !== 'Bearer' || !token) {
      return false;
    }
    
    const decodedUser = UserSessionDto.fromPayload(this.jwtService.verify(token));

    const userEntity = await this.usersService.getUserById(decodedUser.id)
    if (!userEntity) {
      return false;
    }
    return true;
  }
}
