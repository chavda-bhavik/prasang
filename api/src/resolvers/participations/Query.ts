import { Context } from "../../global";

const Query = {
    getParticipations: async (_, _2, { user, db }: Context) => {
        if(!user) return;
        if(user.roles.name == 'Admin') {
            return db.Participations.findAll();
        }
        return db.Participations.findAll({
            where: {
                userId: user.userId
            }
        });
    }
}

export default Query;