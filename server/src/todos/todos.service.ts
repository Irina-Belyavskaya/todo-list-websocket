import { Inject, Injectable } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-status.dto';
import { Todo } from './models/todo.model'

@Injectable()
export class TodosService {

  constructor(
    @Inject('TODOS_REPOSITORY')
    private todosRepository: typeof Todo
  ) {}

  async getAll() {
    return await this.todosRepository.findAll<Todo>()
  }

  async createTodo(todoDto: CreateTodoDto) {
    return await this.todosRepository.create(todoDto)
  }

  async deleteTodo(id: number) {
    return await this.todosRepository.destroy({ where: { id } })
  }

  async updateStatus(id: number, newStatus: UpdateTodoDto) {
    return await this.todosRepository.update({isDone: newStatus.isDone},{where: { id: id }})
  }

}
