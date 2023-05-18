import { Module } from "@nestjs/common";
import { MyGateway } from "./gateway";
import { TodosModule } from "src/todos/todos.module";
import { SecurityModule } from "src/security/security.module";

@Module({
  providers: [MyGateway],
  imports: [TodosModule, SecurityModule]
})
export class GatewayModule {}