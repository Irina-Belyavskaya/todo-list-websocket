import { Body } from '@nestjs/common'
import { Get } from '@nestjs/common'
import { UseGuards } from '@nestjs/common'
import { Controller, Post } from '@nestjs/common'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AuthService } from './auth.service'
import { LoginDto } from './dtos/login.dto'
import { RegistrationDto } from './dtos/registration.dto'
import { JwtPermissionsGuard } from 'src/security/guards/jwt-permissions.guard'
import { User } from './decorators/user.decorator'
import { UserSessionDto } from 'src/security/dtos/userSession.dto'
import { SecurityService } from 'src/security/security.service'

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService,
              private securityService: SecurityService
            ) { }

  @Post('register')
  registraton(@Body() user: RegistrationDto) {
    return this.authService.registration(user);
  }

  @Post('login')
  login(@Body() user: LoginDto ) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logOut() {
    return null;
  }

  @Get('/refresh-token')
  @UseGuards(JwtPermissionsGuard)
  async refreshToken(@User() user: UserSessionDto) {
    const currentUser = await this.securityService.getUserById(user.id);
    return await this.securityService.generateToken(currentUser);
  }
}
