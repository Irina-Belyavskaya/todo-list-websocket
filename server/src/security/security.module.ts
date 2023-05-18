import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { usersProviders } from "src/users/users.providers"
import { UsersService } from "src/users/users.service"
import { UsersModule } from '../users/users.module'
import { SecurityService } from "./security.service"

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '1h'
      }
    }),
    UsersModule
  ],
  providers:[SecurityService, UsersService, ...usersProviders],
  exports: [JwtModule, SecurityService],
})
export class SecurityModule { }
