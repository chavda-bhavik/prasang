import { Context } from "../../global";
import { addUser,deleteUser,editUser,login } from './UserArgTypes';
import hashpassword from '../utils/hashpassword';
// import bcrypt from 'bcryptjs'
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
                email:args.data.email,
                password:args.data.password
            }
        })
        if(!user){
            throw new Error("Unable to Login")
        }
        // const isMatch = await bcrypt.compare(args.data.password,user.password);
        // if(!isMatch){
        //     throw new Error("Invalid Username or Password")
        // }
        return user;
    }
}

export default Mutation