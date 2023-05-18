import { Column, DataType, Model, Table } from "sequelize-typescript"

interface UserCreationAttrs {
  name: string
  email: string
  password: string
}
 
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER, 
    unique: true, 
    autoIncrement: true, 
    primaryKey: true 
  })
  id: string

  @Column
  name: string

  @Column
  email: string

  @Column
  password: string
}
