import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DataType,
  IsUUID,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Roles from "./Roles";

@Table({
  tableName: "users",
})
class User extends Model {
  @IsUUID(4)
  @Column({
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
  })
  userId: string;

  @Column
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column
  password: string;

  @Column
  username: string;

  @Column
  bio: string;

  @Column
  contactNo: string;

  @Column({
    defaultValue: true,
  })
  IsEnable: boolean;

  @ForeignKey(() => Roles)
  @Column({
    type: DataType.UUID,
  })
  roleId: string;

  @BelongsTo(() => Roles)
  roles: Roles;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}

export default User;
