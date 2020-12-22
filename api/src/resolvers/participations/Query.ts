import { Context } from "../../global";
import { participations } from "./ParticipationArgTypes";

const Query = {
    participations: async (_, args:participations, { user, db }: Context) => {
        if(!user) return;
        let where:any = {};
        if(args.eventId) {
            where.eventId = args.eventId;
        }
        if(typeof args.photoAdded === "boolean") {
            where.photoAdded = args.photoAdded
        }
        return db.Participations.findAll({
            where: where
        });
    }
}

export default Query;