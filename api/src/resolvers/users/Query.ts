import { Context } from "../../global";
const { Op } = require("sequelize");
const Query = {
  users: async (_, _2, { db }: Context, _3) => {
    const userData = await db.Users.findAll({
      include: [{ model: db.Roles }],
      where: {
        [Op.not]: [
          {
            username: "admin",
          },
        ],
      },
    });
    return userData;
  },
  usersProfile: async (_, _3, { db, user }: Context, _2) => {
    const users = await user;
    let userId = "0";
    if (users?.userId) {
      userId = users?.userId;
    }
    const findData = await db.Users.findOne({ where: { userId } });
    return findData;
  },
  // myParticipations: async (_, _3, {db,user}: Context, _2) => {
  //     const users = await user;
  //     let userId = '0';
  //     if(users?.userId){
  //         userId = users?.userId;
  //     }
  //     const findData = await db.Participations.findAll({
  //         where:{ userId },
  //         include:[{ model:db.Users },{ model:db.Events }]
  //     });
  //     return findData;
  // },
};

export default Query;
