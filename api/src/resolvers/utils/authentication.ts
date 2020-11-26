import { Context } from "../../global";
import getUserId from '../utils/getUserId'
const { rule } = require("graphql-shield");
//, and, or

export const IsAdmin = rule({ cache: 'contextual' })(async (_, _2, {db,req}:Context, _3) => {
    const userId = await getUserId(req)
    const findData = await db.Users.findOne({where:{userId}});
    const findRoleData = await db.Roles.findOne({where:{roleId:findData.roleId}});
        if(findRoleData.name!='Admin')
        {
            throw new Error("You Have Not Authorize to Access");
        }
    return findRoleData
})

export const IsUser = rule({ cache: 'contextual' })(async (_, _2, {db,req}:Context, _3) => {
    const userId = await getUserId(req)
    const findData = await db.Users.findOne({where:{userId}});
    const findRoleData = await db.Roles.findOne({where:{roleId:findData.roleId}});
    if(findRoleData.name!='User')
    {
        throw new Error("You Have Not Authorize to Access");
    }
    return findRoleData
})

export const IsAuthenticated = rule({ cache: 'contextual' })(async (_, _2, {db}:Context, _3) => {
    return db.Users;
});