import { BOOLEAN, Model, STRING, UUIDV4, UUID } from 'sequelize';
import sequelize from './_index'
import { v4 } from 'uuid'

export class EventCategories extends Model {

}

export class EventCategoriesModal {
    id: string
    name: string
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}

EventCategories.init(
    {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        name: STRING(50),
        isDeleted: {
            type: BOOLEAN,
            defaultValue: false
        }
    },
    { sequelize, modelName: 'EventCategories'}
)