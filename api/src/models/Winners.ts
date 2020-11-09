import { BOOLEAN, Model, STRING, UUIDV4, UUID, DATE } from 'sequelize';
import sequelize from './_index'
import { v4 } from 'uuid'
import { Users } from './Users'
import { Events } from './Events'

export class Winners extends Model {

}

export class WinnersModal {
    ID: string
    priceAmount: string
    winnerDate: Date
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}

Winners.init(
    {
        ID: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        userId: UUID,
        eventId: UUID,
        priceAmount: STRING(50),
        winnerDate: DATE,
        isDeleted: {
            type: BOOLEAN,
            defaultValue: false
        }
    },
    { sequelize, modelName: 'Winners'}
)


Winners.belongsTo(Users, {
    foreignKey: "userId"
})

Winners.belongsTo(Events, {
    foreignKey: "eventId"
})