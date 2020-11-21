import { Context } from "../../global";
import { addUser,deleteUser,editUser } from './UserArgTypes';

const Mutation = {
    addUser: async (_, args: addUser, ctx: Context) => {
        
        let usernameExists = await ctx.db.Users.count({
            where: {
                username: args.username,
            }
        });
        let emailExists = await ctx.db.Users.count({
            where: {
                email: args.email,
            }
        });
        
        if(usernameExists)
        {
           throw new Error("Username Exists Please Select Unique"); 
        }
        if(emailExists)
        {
           throw new Error("Email Exists Please Select Unique"); 
        }
        return ctx.db.Users.create({
            name: args.name,
            email:args.email,
            password:args.password,
            username:args.username,
            contactNo:args.contactNo,
            roleId:args.roleId
        }, {
            raw: true
        });
    },
    editUser: async (_, args: editUser, ctx: Context) => {
        let userExists = await ctx.db.Users.count({
            where: {
                userId: args.userId,
            }
        });
        if(!userExists) {
            throw new Error("user not exists");
        }
        await ctx.db.Users.update({
            name: args.name,
            email:args.email,
            password:args.password,
            username:args.username,
            contactNo:args.contactNo,
            roleId:args.roleId
        }, {
            where: {
                userId: args.userId
            }
        });
        return ctx.db.Users.findOne({
            where: {
                userId: args.userId
            }
        })
    },
    deleteUser: async (_, args: deleteUser, { db }: Context) => {
        let userExists = await db.Users.findOne({
            where: {
                userId: args.userId,
            }
        });
        if(!userExists) {
            throw new Error("user not exists");
        }
        await db.Users.destroy({
            where: {
                userId: args.userId
            }
        });
        return userExists;
    }
}

export default Mutation