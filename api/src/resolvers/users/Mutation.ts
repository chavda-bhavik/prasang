import { Context, fileField } from "../../global";
import {
  addUser,
  deleteUser,
  editUser,
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
var nodemailer = require("nodemailer");
import { processSingleUpload } from "../utils/Upload";
import Roles from "../../models/Roles";

const Mutation = {
  addUser: async (_, args: addUser, { db }: Context) => {
    let hash_password = await hashpassword(args.data.password);
    let role: Roles = await db.Roles.findOne({
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

    if (usernameExists) {
      throw new Error("Username Exists!");
    }
    if (emailExists) {
      throw new Error("Email Exists!");
    }
    return db.Users.create(
      {
        name: args.data.name,
        email: args.data.email,
        password: hash_password,
        username: args.data.username,
        roleId: role.roleId,
      },
      {
        raw: true,
      }
    );
  },
  editUser: async (_, args: editUser, { db, user }: Context) => {
    if (!user) return;
    let data: any = {
      ...args.data,
    };
    if (args.data.image) {
      let image: fileField = await processSingleUpload(args.data.image);
      data.image = image.path;
    }
    let userExists = await db.Users.count({
      where: {
        userId: user.userId,
      },
    });
    if (!userExists) {
      throw new Error("user not exists");
    }
    await db.Users.update(data, {
      where: {
        userId: user.userId,
      },
    });
    return await db.Users.findOne({
      where: {
        userId: user.userId,
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
  login: async (_, args: login, { db }: Context) => {
    const user = await db.Users.findOne({
      where: {
        email: args.data.email,
        IsEnable: true,
      },
    });
    if (!user) {
      throw new Error("Unable to Login");
    }
    const isMatch = await bcrypt.compare(args.data.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Username or Password");
    }
    return {
      user,
      token: generateToken(user.userId),
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
        pass: "dhaval1216",
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
