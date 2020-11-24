import { Context } from "../../global";
import { addUser,deleteUser,editUser,login, enableUser,changePassword,forgotPassword} from './UserArgTypes';
import hashpassword from '../utils/hashpassword';
import generateToken from '../utils/generateToken';
import getUserId from '../utils/getUserId'
import bcrypt = require("bcrypt");
const Mutation = {
    addUser: async (_, args: addUser, {db}: Context) => {
        let hash_password = await hashpassword(args.data.password);
        let usernameExists = await db.Users.count({
            where: {
                username: args.data.username,
            }
        });
        let emailExists = await db.Users.count({
            where: {
                email: args.data.email,
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
        return await db.Users.create({
            name: args.data.name,
            email:args.data.email,
            password:hash_password,
            username:args.data.username,
            contactNo:args.data.contactNo,
            roleId:args.data.roleId
        }, {
            raw: true
        });
    },
    editUser: async (_, args: editUser, {db}: Context) => {
        let userExists = await db.Users.count({
            where: {
                userId: args.data.userId,
            }
        });
        if(!userExists) {
            throw new Error("user not exists");
        }
        await db.Users.update({
            name: args.data.name,
            email:args.data.email,
            password:args.data.password,
            username:args.data.username,
            contactNo:args.data.contactNo,
            roleId:args.data.roleId
        }, {
            where: {
                userId: args.data.userId
            }
        });
        return await db.Users.findOne({
            where: {
                userId: args.data.userId
            }
        })
    },
    deleteUser: async (_, args: deleteUser, { db }: Context) => {
        let userExists = await db.Users.findOne({
            where: {
                userId: args.data.userId,
            }
        });
        if(!userExists) {
            throw new Error("user not exists");
        }
        await db.Users.destroy({
            where: {
                userId: args.data.userId
            }
        });
        return userExists;
    },
    login: async (_, args:login , { db }: Context) => {
        
        const user = await db.Users.findOne({
            where:{
                email:args.data.email
            }
        })
        console.log(user);
        if(!user){
            throw new Error("Unable to Login")
        }
        const isMatch = await bcrypt.compare(args.data.password,user.password);
        if(!isMatch){
            throw new Error("Invalid Username or Password")
        }
        console.log(user.userId)
        return {
            user,
            token: generateToken(user.userId)
        };
    },
    enableUser: async(_,args:enableUser,{db}:Context) => {
        const IsEnable = await db.Users.findByPk(args.data.userId);
        if(!IsEnable)
        {
            throw new Error("User Not Found");
        }
        await db.Users.update({
            IsEnable:args.data.IsEnable
        },{
            where:{
                userId:args.data.userId
            }
        })

        return IsEnable
    },
    changePassword: async(_,args:changePassword,{db,req}:Context) => {
        const userId =await getUserId(req)
        const IsExists = await db.Users.findByPk(userId);
        if(!IsExists)
        {
            throw new Error("User Not Found");
        }
        let oldPassword = await bcrypt.compare(args.data.oldPassword,IsExists.password);
        if(!oldPassword)
        {
            throw new Error("Old Password is Not Match")
        }
        let hash_password = await hashpassword(args.data.password);
        await db.Users.update({
            password:hash_password
        },{
            where:{
                userId:userId
            }
        })
        return IsExists
    },
    forgotPassword:async(_,args:forgotPassword,{db,req}:Context) => {
        await getUserId(req)
        const IsExists = await db.Users.findOne({where:{email:args.data.email}});
        if(!IsExists)
        {
            throw new Error("Email Not Registered");
        }        
        let hash_password = await hashpassword(args.data.password);
        await db.Users.update({
            password:hash_password
        },{
            where:{
                email:args.data.email
            }
        })
        return IsExists
    }
}

export default Mutation