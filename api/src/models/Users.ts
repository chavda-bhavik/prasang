import { Model, STRING, BOOLEAN, UUIDV4, UUID, TEXT  } from "sequelize";
import sequelize from './_index'
import { Roles } from './Roles'

export class Users extends Model {

}

export class UsersModel {
    userId: string
    name: string
    email: string
    password: string
    username: string
    contactNo: string
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}

Users.init(
    {
        userId: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        name: STRING(50),
        email: {
           type: STRING(50),
           unique: true
        },
        password: TEXT,
        username: {
            type: STRING(50),
            unique: true
        },
        contactNo: STRING(12),
        roleId: UUID,
        isDeleted: {
            type: BOOLEAN,
            defaultValue: false
        }
    },
    { sequelize, modelName: "Users" }
)

Users.belongsTo(Roles, {
    foreignKey: "roleId"
})