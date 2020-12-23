import { Sequelize } from "sequelize-typescript";
import hashpassword from "../resolvers/utils/hashpassword";

import Comments from "./Comments";
import EventCategories from "./EventCategories";
import Events from "./Events";
import Photos from "./Photos";
import Roles from "./Roles";
import User from "./Users";
import Winner from "./Winners";
import Participations from './Participations';

import * as config  from './../../db-config.json';
import { db } from "../global";
const dbConfig = config[process.env.mode || 'development']

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
sequelize.addModels([User, Winner, Comments, EventCategories, Events, Photos, Roles, Participations]);

sequelize.sync({ alter:true }).then( async () => {
    console.log("db synced");
    await makeRoleEntries();
});

async function makeRoleEntries() {
    let roles = await Roles.count();
    if(roles == 0) {
        let roles:Roles[] = await Roles.bulkCreate([
            { name:"Admin" },
            { name:"User" },
        ]);
        let password1 = await hashpassword("admin1234");
        let password2 = await hashpassword("user1234");
        await User.bulkCreate([
            {
                name:"admin",
                email:"admin@gmail.com",
                password: password1,
                username: "admin",
                contactNo: '9998886660',
                roleId: roles[0].roleId
            }, {
                name:"user",
                email:"user@gmail.com",
                password: password2,
                username: "user",
                contactNo: '9784561230',
                roleId: roles[1].roleId
            }
        ]);
        console.log("Initial entried made to the database!");
    }
}

const obj: db = {
    Events: Events,
    EventCategories: EventCategories,
    Comments: Comments,
    Photos: Photos,
    Roles: Roles,
    Users: User,
    Winners: Winner,
    Participations: Participations,
    sequelize: sequelize
}
export default obj;