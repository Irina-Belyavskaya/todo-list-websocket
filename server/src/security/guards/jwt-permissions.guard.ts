import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserSessionDto } from '../dtos/userSession.dto';

@Injectable()
export class JwtPermissionsGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext) {
    try {      
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if(bearer !== 'Bearer' || !token) {
        throw new HttpException({message: 'User Unauthorized'}, HttpStatus.UNAUTHORIZED);
      }
      
      const decodedUser = UserSessionDto.fromPayload(this.jwtService.verify(token));

      const userEntity = await this.usersService.getUserById(decodedUser.id)
      if (!userEntity) {
        throw new HttpException({message: 'User Unauthorized'}, HttpStatus.UNAUTHORIZED);
      }
      req.user = decodedUser;
      return true;
    } catch (error) {
      throw new HttpException({message: 'User Unauthorized'}, HttpStatus.UNAUTHORIZED);
    }
  }
}