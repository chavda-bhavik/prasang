import { Sequelize } from "sequelize";

import * as config  from '../../db-config.json';

// const dbConfig = config["development"]
const sequelize = new Sequelize("prasang","postgres","root", {
    dialect: 'postgres',
    host: '127.0.0.1',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: true
});

sequelize.sync({alter: true}).then(() => {
    console.log("DB Droped, Resync and roles created.");
});
  
export default sequelize