import { Context, fileField } from "../../global";
import {
    addUser,
    deleteUser,
    editProfile,
    login,
    enableUser,
    changePassword,
    forgotPassword,
    forgotPasswords,
} from "./UserArgTypes";
import hashpassword from "../utils/hashpassword";
import generateToken, { generateTokenPassword } from "../utils/generateToken";
import getUserId from "../utils/getUserId";
import bcrypt = require("bcrypt");
const { Op } = require("sequelize");
var nodemailer = require("nodemailer");
import { processSingleUpload } from "../utils/Upload";
const Mutation = {
    registerUser: async (_, args: addUser, { db }: Context) => {
        let hash_password = await hashpassword(args.data.password);
        let role: any = await db.Roles.findOne({
            where: {
                name: "User",
            },
        });
        let usernameExists = await db.Users.count({
            where: {
                username: args.data.username,
            },
        });
        let emailExists = await db.Users.count({
            where: {
                email: args.data.email,
            },
        });
        // let phoneExists = await db.Users.count({
        //     where: {
        //         contactNo: args.data.contactNo,
        //     }
        // });

        if (usernameExists) {
            throw new Error("Username Exists Please Select Unique");
        }
        if (emailExists) {
            throw new Error("Email Exists Please Select Unique");
        }
        // if(phoneExists)
        // {
        //    throw new Error("contactNo Exists Please Select Unique");
        // }
        // if(args.data.image) {
        //     let image:fileField = await processSingleUpload(args.data.image);
        //     args.data.image = image.path;
        // }
        return await db.Users.create(
            {
                name: args.data.name,
                email: args.data.email,
                password: hash_password,
                username: args.data.username,
                // contactNo:args.data.contactNo,
                roleId: role.roleId,
                // image:args.data.image
            },
            {
                raw: true,
            }
        );
    },
    editProfile: async (_, args: editProfile, { db, user }: Context) => {
        const users = await user;
        let userId = "0";
        if (users?.userId) {
            userId = users?.userId;
        }
        let role: any = await db.Roles.count({
            where: {
                name: "User",
            },
        });
        if (user) {
            if (args.data.username) {
                let usernameExists = await db.Users.count({
                    where: {
                        [Op.not]: [
                            {
                                username: user.username,
                            },
                        ],
                        username: args.data.username,
                    },
                });

                if (usernameExists) {
                    // if(usernameExists.username !== user.username)
                    {
                        throw new Error("Username already exists");
                    }
                }
            }
            if (args.data.email) {
                let emailExists = await db.Users.count({
                    where: {
                        [Op.not]: [
                            {
                                email: user.email,
                            },
                        ],
                        email: args.data.email,
                    },
                });

                if (emailExists) {
                    throw new Error("Email already exists");
                }
            }
            if (args.data.contactNo) {
                let phoneExists = await db.Users.count({
                    where: {
                        [Op.not]: [
                            {
                                contactNo: user.contactNo,
                            },
                        ],
                        contactNo: args.data.contactNo,
                    },
                });

                if (phoneExists) {
                    throw new Error("ContactNo already exists");
                }
            }

            if (args.data.image) {
                let image: fileField = await processSingleUpload(
                    args.data.image
                );
                args.data.image = image.path;
            }
            console.log(userId);
            await db.Users.update(
                {
                    name: args.data.name,
                    email: args.data.email,
                    password: args.data.password,
                    username: args.data.username,
                    contactNo: args.data.contactNo,
                    roleId: role.roleId,
                    image: args.data.image,
                    bio : args.data.bio
                },
                {
                    where: {
                        userId: userId,
                    },
                }
            );
        }
        return await db.Users.findOne({
            where: {
                userId: userId,
            },
        });
    },
    deleteUser: async (_, args: deleteUser, { db }: Context) => {
        let userExists = await db.Users.findOne({
            where: {
                userId: args.data.userId,
            },
        });
        if (!userExists) {
            throw new Error("user not exists");
        }
        await db.Users.destroy({
            where: {
                userId: args.data.userId,
            },
        });
        return userExists;
    },
    login: async (_, args:login , { db }: Context) => {
        let rolename="";
        if(args.data.role === 'Admin')
            rolename="Admin"
        if(args.data.role === 'User')
            rolename="User"    
        const role = await db.Roles.findOne({
            where:{
                name:rolename
            }  
        })
        if(!role)
        {
            throw new Error("Unable to logins")
        }
        const user = await db.Users.findOne({
            where:{
                email:args.data.email,
                IsEnable:true,
                roleId:role.roleId
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
    enableUser: async (_, args: enableUser, { db }: Context) => {
        const IsEnable = await db.Users.findByPk(args.data.userId);
        if (!IsEnable) {
            throw new Error("User Not Found");
        }
        await db.Users.update(
            {
                IsEnable: args.data.IsEnable,
            },
            {
                where: {
                    userId: args.data.userId,
                },
            }
        );
        const IsEnables = await db.Users.findByPk(args.data.userId);
        return IsEnables;
    },
    changePassword: async (_, args: changePassword, { db, req }: Context) => {
        const userId = await getUserId(req);
        const IsExists = await db.Users.findByPk(userId);
        if (!IsExists) {
            throw new Error("User Not Found");
        }
        let oldPassword = await bcrypt.compare(
            args.data.oldPassword,
            IsExists.password
        );
        if (!oldPassword) {
            throw new Error("Old Password is Not Match");
        }
        let hash_password = await hashpassword(args.data.password);
        await db.Users.update(
            {
                password: hash_password,
            },
            {
                where: {
                    userId: userId,
                },
            }
        );
        return IsExists;
    },
    forgotPassword: async (_, args: forgotPassword, { db, req }: Context) => {
        await getUserId(req);
        const IsExists = await db.Users.findOne({
            where: { email: args.data.email },
        });
        if (!IsExists) {
            throw new Error("Email Not Registered");
        }
        let hash_password = await hashpassword(args.data.password);
        await db.Users.update(
            {
                password: hash_password,
            },
            {
                where: {
                    email: args.data.email,
                },
            }
        );
        return IsExists;
    },
    forgotPasswords: async (_, args: forgotPasswords, { db }: Context) => {
        const user = await db.Users.findOne({
            where: {
                email: args.data.email,
                IsEnable: true,
            },
        });
        if (!user) {
            throw new Error("Email Not Registered");
        }
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "dp297609@gmail.com",
                pass: "dhaval",
            },
        });
        const token = await generateTokenPassword(user.userId);
        var html = `<h1><a href="http://localhost:3000/prasangadmin/forgotpasswords/${token}/${args.data.email}">Click Here</a></h1>`;
        var mailOptions = {
            from: "dp297609@gmail.com",
            to: args.data.email,
            subject: "Forgot Password",
            html: html,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        return {
            user,
            token: "Bearer " + token,
        };
    },
};

export default Mutation;
