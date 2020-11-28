import { Context } from "../../global";
import getUserId from '../utils/getUserId'

const Query = {
    getParticipations: async (_, _2, { req, db }: Context) => {
        const userId = getUserId(req, false);
        if(userId) {
            return db.Participations.findAll({
                where: {
                    userId: userId
                }
            })
        }
        return db.Participations.findAll();
    }
}

export default Query;