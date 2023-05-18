import { Module } from '@nestjs/common'
import { TodosService } from './todos.service'
import { TodosController } from './todos.controller'
import { todosProviders } from './todos.providers'
import { DatabaseModule } from '../database/database.module'
import { SecurityModule } from '../security/security.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  providers: [TodosService,...todosProviders],
  controllers: [TodosController],
  imports: [DatabaseModule, SecurityModule, UsersModule],
  exports: [TodosService]
})
export class TodosModule {}
