import { CreateTodoDto } from "src/todos/dto/create-todo.dto";
import { MethodTypes } from "../enums/methods";
import { UpdateTodoDto } from "src/todos/dto/update-status.dto";

export class MessageDto {
  readonly jwt_token: string;
  readonly method: MethodTypes;
  readonly parameter: number | undefined;
  readonly newTodo: CreateTodoDto | undefined;
  readonly newStatus: UpdateTodoDto | undefined;
}