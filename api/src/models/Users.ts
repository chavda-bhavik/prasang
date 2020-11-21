import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, DataType, IsUUID, BelongsTo, ForeignKey } from "sequelize-typescript";
import Role from "./Roles";

@Table({
    tableName: "users"
})
class User extends Model{
    @IsUUID(4)
    @Column({
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID
    })
    userId: string

    @Column
    name: string
    
    @Column({
        unique: true
    })
    email: string

    @Column
    password: string

    @Column
    username: string

    @Column
    contactNo: string

    @ForeignKey( () => Role)
    @Column({
        type: DataType.UUID
    })
    roleId: string

    @BelongsTo( () => Role)
    role: Role

    @CreatedAt
    createdAt: Date

    @UpdatedAt
    updatedAt: Date

    @DeletedAt
    deletedAt: Date
}

export default User