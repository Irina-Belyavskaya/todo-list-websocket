import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageDto } from "./dto/message.dto";
import { MethodTypes } from "./enums/methods";
import { TodosService } from "src/todos/todos.service";
import {Server} from 'socket.io';
import { OnModuleInit } from "@nestjs/common";
import { SecurityService } from "src/security/security.service";

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000']
  }
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor (
    private todosService: TodosService, 
    private securityService: SecurityService
  ) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    })
  }

  @SubscribeMessage('todos')
  async onMessage(@MessageBody() body: MessageDto) {
    if (!await this.securityService.checkJwtToken(body.jwt_token)) {
      console.log('error')
      this.server.emit('onMessage', {
        error: true, 
        message: 'User Unauthorized', 
        data: undefined
      });
      return;
    }

    switch (body.method) {
      case MethodTypes.GET: 
        this.server.emit('onMessage', {
          error: false, 
          message: undefined, 
          data: await this.todosService.getAll()
        });
        break;
      case MethodTypes.POST: 
        if (body.newTodo) {
          await this.todosService.createTodo(body.newTodo);
          this.server.emit('onMessage',{
            error: false, 
            message: undefined, 
            data: await this.todosService.getAll()
          });
        }
        break;
      case MethodTypes.UPDATE: 
        if (body.newStatus && body.parameter) {
          await this.todosService.updateStatus(body.parameter, body.newStatus);
          this.server.emit('onMessage', {
            error: false, 
            message: undefined, 
            data: await this.todosService.getAll()
          });
        }
        break;
      case MethodTypes.DELETE: 
        if (body.parameter) {
          await this.todosService.deleteTodo(body.parameter)
          this.server.emit('onMessage', {
            error: false, 
            message: undefined, 
            data: await this.todosService.getAll()
          });
        }
        break;
      default: 
        this.server.emit('onMessage','Default');
    }
  }
}