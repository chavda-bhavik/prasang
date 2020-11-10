import { Sequelize } from "sequelize-typescript";

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
        logging: dbConfig["logging"]
    }
);

export default sequelize