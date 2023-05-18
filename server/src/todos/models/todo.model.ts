import { Column, DataType, Model, Table } from "sequelize-typescript"

interface TodoCreationAttrs {
  text: string
  isDone: boolean
}
 
@Table({tableName: 'todos'})
export class Todo extends Model<Todo, TodoCreationAttrs> {
  static delete(id: number) {
    throw new Error('Method not implemented.')
  }
  @Column({
    type: DataType.INTEGER, 
    unique: true, 
    autoIncrement: true, 
    primaryKey: true 
  })
  id: number

  @Column
  text: string

  @Column
  isDone: boolean
}
