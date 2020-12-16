import { Sequelize } from "sequelize-typescript";
import Comments from "./models/Comments";
import EventCategories from "./models/EventCategories";
import Events from "./models/Events";
import Photo from "./models/Photos";
import Role from "./models/Roles";
import User from "./models/Users";
import Winner from "./models/Winners";
import Participations from "./models/Participations";

export interface db {
    sequelize: Sequelize
    Comments: typeof Comments
    EventCategories: typeof EventCategories
    Events: typeof Events
    Photos: typeof Photo
    Roles: typeof Role
    Users: typeof User
    Winners: typeof Winner
    Participations: typeof Participations
}
export interface Context {
    req: Request
    res: Response
    db: db
    user : User | null
}
export interface fileField {
    path: string
    uploadName: string
    mimetype: string
}
// export interface ModelValues {
//     [key: any]: {
//         dataValues: any
//         _previousDataValues: any
//         _changed: any
//         _modelOptions: any
//         _options: any
//         isNewRecord: Boolean
//     }
// }
