import { CreateTodoDto } from "types/create-todo-dto.type";
import { MethodTypes } from "../enums/methods"
import { UpdateTodoDto } from "types/update-status-dto.type";

export type MessageDto = {
  readonly jwt_token: string;
  readonly method: MethodTypes;
  readonly parameter: number | undefined;
  readonly newTodo: CreateTodoDto | undefined;
  readonly newStatus: UpdateTodoDto | undefined;
}