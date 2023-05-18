import { Sequelize } from 'sequelize-typescript'
import { Todo } from 'src/todos/models/todo.model'
import { User } from 'src/users/models/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'todo-list',
      });
      sequelize.addModels([Todo, User]);
      await sequelize.sync();
      return sequelize
    },
  },
];