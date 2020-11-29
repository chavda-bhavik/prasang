import { Context, db } from "./global";
import User from "./models/Users";
const { rule,shield,and } = require("graphql-shield");
import getUserId from './resolvers/utils/getUserId'

export const getUser = async (req: Request, db: db) : Promise<User | null>  => {
    let userId : string = getUserId(req);
    if(!userId) userId = '0';
    return await db.Users.findOne({
        where: {
            userId: userId
        },
        include: [{
            model: db.Roles,
            attributes: ["name"]
        }]
    })
}

const IsAuthenticated = rule({ cache: 'contextual' })(async (_, _2, {user}:Context, _3) => {
    const result = !!user;
    console.log(`isAuthenticated:${result}`);
    return result;
});

const IsAdmin = rule({ cache: 'contextual' })(async (_, _2, {user}:Context, _3) => {
    const u = await user;
    const result = u?.roles.name === "Admin";
    console.log(`isAdmin:${result}`);
    return result;
})

const IsUser = rule({ cache: 'contextual' })(async (_, _2, {user}:Context, _3) => {    
    const u = await user;
    const result = u?.roles.name === "User";
    console.log(`isUser:${result}`);
    return result;
})

export const Permissions = shield({
    Query: {
      Dashboard: and(IsAuthenticated, IsAdmin),
      usersProfile: and(IsAuthenticated, IsUser),
      myParticipations: and(IsAuthenticated, IsUser),
    }
})
