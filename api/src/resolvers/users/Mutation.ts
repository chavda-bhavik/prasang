import { Context, fileField } from "../../global";
import { addUser,deleteUser,editUser,login, enableUser,changePassword,forgotPassword} from './UserArgTypes';
import hashpassword from '../utils/hashpassword';
import generateToken from '../utils/generateToken';
import { processSingleUpload } from "../utils/Upload";
import bcrypt = require("bcrypt");
import { processSingleUpload } from "../utils/Upload";
const Mutation = {
    addUser: async (_, args: addUser, {db}: Context) => {
        let hash_password = await hashpassword(args.data.password);
        let role = await db.Roles.findOne({
            where:{
                name: "User"
            }
        });
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
        let phoneExists = await db.Users.count({
            where: {
                contactNo: args.data.contactNo,
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
        if(phoneExists)
        {
           throw new Error("contactNo Exists Please Select Unique"); 
        }
        if(args.data.image) {
            let image:fileField = await processSingleUpload(args.data.image);
            args.data.image = image.path;
        }
        return await db.Users.create({
            name: args.data.name,
            email:args.data.email,
            password:hash_password,
            username:args.data.username,
            contactNo:args.data.contactNo,
            roleId:role.roleId,
            image:args.data.image
        }, {
            raw: true
        });
    },
    editUser: async (_, args: editUser, {db,user}: Context) => {
        const users = await user; 
        let userId = '0';
        console.log(userId);
        if(users?.userId){
            userId = users?.userId;
        }
        let role = await db.Roles.count({
            where:{
                name: "User"
            }
        });
        let userExists = await db.Users.count({
            where: {
                userId: userId,
            }
        });
        if(!userExists) {
            throw new Error("user not exists");
        }
        if(args.data.image) {
            let image:fileField = await processSingleUpload(args.data.image);
            args.data.image = image.path;
            // delete args.data.image;
        }
        await db.Users.update({
            name: args.data.name,
            email:args.data.email,
            password:args.data.password,
            username:args.data.username,
            contactNo:args.data.contactNo,
            roleId:role.roleId,
            image:args.data.image
        }, {
            where: {
                userId: userId
            }
        });
        return await db.Users.findOne({
            where: {
                userId: userId
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
                email:args.data.email,
                IsEnable:true
            }
        })
        if(!user){
            throw new Error("Unable to Login")
        }
        const isMatch = await bcrypt.compare(args.data.password,user.password);
        if(!isMatch){
            throw new Error("Invalid Username or Password")
        }
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
    changePassword: async(_,args:changePassword,{db,user}:Context) => {
        const users = await user; 
        let userId = '0';
        if(users?.userId){
            userId = users?.userId;
        }
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
    forgotPassword:async(_,args:forgotPassword,{db}:Context) => {
        // const users = await user; 
        // let userId = '0';
        // if(users?.userId){
        //     userId = users?.userId;
        // }
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