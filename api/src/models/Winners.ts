import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, DataType, IsUUID, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./Users";
import Event from './Events';

@Table({
    tableName: "winners"
})
class Winner extends Model{
    @IsUUID(4)
    @Column({
        primaryKey: true,
        defaultValue: DataType.UUIDV4
    })
    winnerId: string

    @Column
    priceAmount: number

    @Column
    winDate: Date

    @ForeignKey( () => User)
    @Column({
        type: DataType.UUID
    })
    userId: string

    @BelongsTo( () => User)
    user: User

    @ForeignKey( () => Event)
    @Column({
        type: DataType.UUID
    })
    eventId: string

    @BelongsTo( () => Event)
    event: Event

    @CreatedAt
    createdAt: Date

    @UpdatedAt
    updatedAt: Date

    @DeletedAt
    deletedAt: Date
}

export default Winner