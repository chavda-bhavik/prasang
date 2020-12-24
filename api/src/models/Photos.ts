import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo, IsUUID, HasMany } from "sequelize-typescript";
import Comments from "./Comments";
import Participations from "./Participations";

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

    @Column({
        defaultValue: [],
        type: DataType.ARRAY(DataType.UUID)
    })
    likes: string[]

    @Column({
        defaultValue: new Date()
    })
    uploadDate: Date

    @ForeignKey( () => Participations)
    @Column({
        type: DataType.UUID
    })
    participationId: string

    @HasMany(() => Comments)
    comments: Comments[]

    @BelongsTo( () => Participations)
    participations: Participations

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