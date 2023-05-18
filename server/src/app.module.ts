import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    TodosModule,
    UsersModule,
    AuthModule,
    GatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
