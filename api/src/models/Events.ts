import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, DataType, IsUUID, ForeignKey, BelongsTo } from "sequelize-typescript";
import EventCategories from "./EventCategories";

@Table({
    tableName: "events"
})
class Events extends Model{
    @IsUUID(4)
    @Column({
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID
    })
    eventId: string

    @Column
    title: string

    @Column
    description: string

    @Column
    startDate: Date

    @Column
    endDate: Date

    @Column
    fees: number

    @Column
    eventType: string

    @Column
    imageUrl: string

    @Column
    slug: string

    @ForeignKey( () => EventCategories)
    @Column({
        type: DataType.UUID
    })
    categoryId: string

    @BelongsTo( () => EventCategories)
    category: EventCategories

    @CreatedAt
    createdAt: Date

    @UpdatedAt
    updatedAt: Date

    @DeletedAt
    deletedAt: Date
}

export default Events