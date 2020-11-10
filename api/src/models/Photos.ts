import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo, IsUUID } from "sequelize-typescript";
import Event from './Events'

@Table({
    tableName: "photos"
})
class Photo extends Model{
    @IsUUID(4)
    @Column({
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID
    })
    photoId: string

    @Column
    imageUrl: string

    @Column
    likes: number

    @Column
    uploadDate: Date

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

export default Photo

// export class PhotosModal {
//     ID: string
//     imageUrl: string
//     likes: string
//     uploadDate: Date
//     isDeleted: boolean
//     createdAt: Date
//     updatedAt: Date
// }