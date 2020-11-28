import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, DataType, IsUUID } from "sequelize-typescript";
// import User from "./Users";

@Table({
    tableName:"roles"
})
class Roles extends Model{
    @IsUUID(4)
    @Column({
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID
    })
    roleId: string

    // @HasMany(() => User)
    // users: User[];

    @Column
    name: string

    @CreatedAt
    createdAt: Date

    @UpdatedAt
    updatedAt: Date

    @DeletedAt
    deletedAt: Date
}

export default Roles