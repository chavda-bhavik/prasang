import { Model, STRING, BOOLEAN, UUIDV4, UUID, TEXT, DATE  } from "sequelize";
import sequelize from './_index'
import { EventCategories } from './EventCategories'

export class Events extends Model {

}

export class EventsModel {
    id: string
    title: string
    description: Text
    startDate: Date
    endDate: Date
    eventType: string
    fees: string
    imageUrl: Text
    slug:Text
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}

Events.init(
    {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        title: STRING(50),
        description: STRING(50),
        startDate: DATE,
        endDate: DATE,
        eventType:STRING(50),
        fees:STRING(50),
        imageUrl:STRING(50),
        slug:STRING(50),
        eventCategoryId: UUID,
        isDeleted: {
            type: BOOLEAN,
            defaultValue: false
        }
    },
    { sequelize, modelName: "Events" }
)

Events.belongsTo(EventCategories, {
    foreignKey: "eventCategoryId"
})