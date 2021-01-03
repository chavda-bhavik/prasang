import { Context } from "../../global";
import User from "../../models/Users";

const UsersResolver = {
  comments: (parent: User, _, { db }: Context) => {
    return db.Comments.findAll({
      where: {
        userId: parent.userId,
      },
    });
  },
  participations: (parent: User, _, { db }: Context) => {
    return db.Participations.findAll({
      where: {
        userId: parent.userId,
      },
    });
  },
  photos: async (parent: User, _, { db }: Context) => {
    let participations = await db.Participations.findAll({
      where: {
        userId: parent.userId,
      },
      include: [
        {
          model: db.Photos,
        },
      ],
    });
    return participations.map((ptc) => ptc.photo).filter((photo) => !!photo);
  },
};

export default UsersResolver;
