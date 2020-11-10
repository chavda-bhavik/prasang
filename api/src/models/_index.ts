import { Sequelize } from "sequelize-typescript";

import Comments from "./Comments";
import EventCategories from "./EventCategories";
import Events from "./Events";
import Photos from "./Photos";
import Roles from "./Roles";
import User from "./Users";
import Winner from "./Winners";
import * as config  from './../../db-config.json';

const dbConfig = config["development"]

const sequelize = new Sequelize(
    dbConfig["database"],
    dbConfig["username"],
    dbConfig["password"],
    {
        dialect: dbConfig["dialect"] as "postgres" | "mysql" | undefined,
        host: dbConfig["host"],
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: dbConfig["logging"],
    }
);

sequelize.addModels([User, Winner, Comments, EventCategories, Events, Photos, Roles]);

sequelize.sync({ alter: true }).then( () => {
    console.log("db synced");
});

export default sequelize;