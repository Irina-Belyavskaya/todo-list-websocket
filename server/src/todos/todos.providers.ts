import { Todo } from "./models/todo.model"


export const todosProviders = [
  {
    provide: 'TODOS_REPOSITORY',
    useValue: Todo,
  },
]