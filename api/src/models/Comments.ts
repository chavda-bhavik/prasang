import { BOOLEAN, Model, STRING, UUIDV4, UUID, DATE } from 'sequelize';
import sequelize from './_index'
import { v4 } from 'uuid'
import { Users } from './Users'

export class Comments extends Model {

}

export class CommentsModal {
    ID: string
    text: string
    photoId: string
    commentDate: Date
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}

Comments.init(
    {
        ID: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        text: STRING(50),
        photoId: UUID,
        userId: UUID,
        commentDate: DATE,
        isDeleted: {
            type: BOOLEAN,
            defaultValue: false
        }
    },
    { sequelize, modelName: 'Comments'}
)


Comments.belongsTo(Users, {
    foreignKey: "userId"
})
