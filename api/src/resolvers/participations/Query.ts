import { Context } from "../../global";

const Query = {
    getParticipations: async (_, _2, { db, user }: Context) => {
        if(user?.roles.name === 'User') {
            return db.Participations.findAll({
                where: {
                    userId: user.userId
                }
            })
        }
        return db.Participations.findAll();
    }
}

export default Query;