import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, DataType, IsUUID } from "sequelize-typescript";

@Table({
    tableName: "eventcategories"
})
class EventCategories extends Model{
    @IsUUID(4)
    @Column({
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID
    })
    categoryId: string

    @Column
    name: string

    @Column
    imagePath: string

    @CreatedAt
    createdAt: Date

    @UpdatedAt
    updatedAt: Date
    
    @DeletedAt
    deletedAt: Date
}

export default EventCategories