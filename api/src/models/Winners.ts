import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, DataType, IsUUID, ForeignKey, BelongsTo } from "sequelize-typescript";
import Participations from "./Participations";

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

    @Column({
        defaultValue: 0
    })
    priceAmount: number

    @Column({
        defaultValue: new Date()
    })
    winDate: Date

    @Column({
        defaultValue: 1
    })
    rank:number

    @ForeignKey( () => Participations)
    @Column({
        type: DataType.UUID
    })
    participationId: string

    @BelongsTo( () => Participations)
    participation: Participations

    @CreatedAt
    createdAt: Date

    @UpdatedAt
    updatedAt: Date

    @DeletedAt
    deletedAt: Date
}

export default Winner