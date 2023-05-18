import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { usersProviders } from './users.providers'
import { UsersService } from './users.service'
import {DatabaseModule} from '../database/database.module'


@Module({
  providers: [UsersService,...usersProviders],
  controllers: [UsersController],
  imports: [DatabaseModule],
  exports: [UsersService]
})
export class UsersModule {}

