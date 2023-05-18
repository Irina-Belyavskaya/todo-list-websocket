import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { JwtPermissionsGuard } from 'src/security/guards/jwt-permissions.guard'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-status.dto'
import { TodosService } from './todos.service'

@Controller('todos')
@UseGuards(JwtPermissionsGuard)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getAll () {
    return this.todosService.getAll()
  }

  @Post()
  create (@Body() todoDto: CreateTodoDto) {
    return this.todosService.createTodo(todoDto)
  }

  @Delete('/:id')
  deleteTodo (@Param() param) {
    return this.todosService.deleteTodo(param.id)
  }

  @Patch('/:id')
  updateStatus (@Param() param, @Body() newStatus: UpdateTodoDto) {
    return this.todosService.updateStatus(param.id, newStatus)
  }
}
