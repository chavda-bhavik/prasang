import { Sequelize } from "sequelize-typescript";
import Comments from "./models/Comments";
import EventCategories from "./models/EventCategories";
import Events from "./models/Events";
import Photo from "./models/Photos";
import Role from "./models/Roles";
import User from "./models/Users";
import Winner from "./models/Winners";

export interface db {
    sequelize: Sequelize
    Comments: typeof Comments
    EventCategories: typeof EventCategories
    Events: typeof Events
    Photos: typeof Photo
    Roles: typeof Role
    Users: typeof User
    Winners: typeof Winner
}
export interface Context {
    req: Request
    res: Response
    db: db
}