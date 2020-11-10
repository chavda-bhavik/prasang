import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, DataType, IsUUID, ForeignKey, BelongsTo } from "sequelize-typescript";
import Photo from "./Photos";
import User from "./Users";

@Table({
    tableName: "comments"
})
class Comments extends Model{
    @IsUUID(4)
    @Column({
        primaryKey: true,
        defaultValue: DataType.UUIDV4
    })
    commentId: string

    @Column
    text: string

    @ForeignKey( () => Photo)
    @Column({
        type: DataType.UUID
    })
    photoId: string

    @BelongsTo( () => Photo)
    photo: Photo

    @ForeignKey( () => User)
    @Column({
        type: DataType.UUID
    })
    userId: string

    @BelongsTo( () => User)
    user: User

    @Column
    commentDate: Date

    @CreatedAt
    createdAt: Date

    @UpdatedAt
    updatedAt: Date

    @DeletedAt
    deletedAt: Date
}

export default Comments