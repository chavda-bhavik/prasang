import { Context, db } from "./global";
import User from "./models/Users";
import { rule,shield,and, or } from "graphql-shield";
import getUserId from './resolvers/utils/getUserId'

export const getUser = async (req: Request, db: db) : Promise<User | null>  => {
    let userId : string = getUserId(req);
    if(!userId) return null;
    let user = await db.Users.findOne({
        where: {
            userId: userId
        },
        include: [{
            model: db.Roles,
            attributes: ["name"],
        }]
    });
    return user.toJSON();
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
        usersProfile: IsAuthenticated,
        myParticipations: and(IsAuthenticated, IsUser),
        // Participations
        getParticipations: and(IsAuthenticated, or(IsAdmin, IsUser))
    },
    Mutation: {
        // Event Categories
        // addEventCategory: and(IsAuthenticated, IsAdmin),
        // editEventCategory: and(IsAuthenticated, IsAdmin),
        // deleteEventCategory: and(IsAuthenticated, IsAdmin),
        
        // Role
        addRole: and(IsAuthenticated, IsAdmin),

        // Events
        addEvent: and(IsAuthenticated, IsAdmin),
        editEvent: and(IsAuthenticated, IsAdmin),
        deleteEvent: and(IsAuthenticated, IsAdmin),
        // Participations
        participate: and(IsAuthenticated, IsUser)
    }
}, {
    allowExternalErrors: true,
})
