import { CreateTodoDto } from "types/create-todo-dto.type";
import { UpdateTodoDto } from "types/update-status-dto.type";
import repository from "repository";
import { headers } from "../headers";
import { TodoType } from "types/Todo";

export const getTodos = async () => {
  const { data } = await repository.get('todos', headers)
  return data.sort((firstEl: TodoType, secondEl: TodoType) => firstEl.id - secondEl.id);
}

export const addTodo = async (todo: CreateTodoDto) => {
  return await repository.post('todos', todo, headers);
}

export const deleteTodo = async (id: number) => {
  return await repository.delete(`todos/${id}`, headers);
}

export const updateStatus = async (id: number, todo: UpdateTodoDto) => {
  return await repository.patch(`todos/${id}`, todo, headers);
}