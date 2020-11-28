import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, DataType, IsUUID, ForeignKey, BelongsTo } from "sequelize-typescript";
import Events from "./Events";
import Users from './Users'

@Table({
    tableName: "participations"
})
class Participations extends Model{
    @IsUUID(4)
    @Column({
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID
    })
    participationId: string

    @ForeignKey( () => Users)
    @Column({
        type: DataType.UUID
    })
    userId: string

    @BelongsTo( () => Users)
    user: Users

    @ForeignKey( () => Events)
    @Column({
        type: DataType.UUID
    })
    eventId: string

    @BelongsTo( () => Events)
    event: Events

    @Column({
        defaultValue: new Date()
    })
    participationDate: Date

    @Column({
        defaultValue: false
    })
    photoAdded: Boolean

    @CreatedAt
    createdAt: Date

    @UpdatedAt
    updatedAt: Date

    @DeletedAt
    deletedAt: Date
}

export default Participations