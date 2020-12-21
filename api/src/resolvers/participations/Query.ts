import { Context } from "../../global";
import { participations } from "./ParticipationArgTypes";

const Query = {
    participations: async (_, args:participations, { user, db }: Context) => {
        if(!user) return;
        if(args.eventId) {
            return db.Participations.findAll({
                where: {
                    eventId: args.eventId
                }
            })
        }
        return db.Participations.findAll();
    }
}

export default Query;