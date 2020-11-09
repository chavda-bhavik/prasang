import { BOOLEAN, Model, STRING, UUIDV4, UUID, DATE } from 'sequelize';
import sequelize from './_index'
import { v4 } from 'uuid'
import { Users } from './Users'
import { Events } from './Events'

export class Photos extends Model {

}

export class PhotosModal {
    ID: string
    imageUrl: string
    likes: string
    uploadDate: Date
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}

Photos.init(
    {
        ID: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        imageUrl: STRING(50),
        eventId: UUID,
        likes: STRING(50),
        uploadDate: DATE,
        userId: UUID,
        isDeleted: {
            type: BOOLEAN,
            defaultValue: false
        }
    },
    { sequelize, modelName: 'Photos'}
)


Photos.belongsTo(Users, {
    foreignKey: "userId"
})

Photos.belongsTo(Events, {
    foreignKey: "eventId"
})