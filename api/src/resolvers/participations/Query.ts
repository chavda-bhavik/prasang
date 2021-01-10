import { Context } from "../../global";
import { participations, user_participations } from "./ParticipationArgTypes";

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
    },
    user_participations: async (_, args:user_participations, { db }: Context) => {
        if(args.photoId)
        {
            const parti = db.Participations.findAll({
                include:[{
                    model:db.Photos,where:{
                        photoId:args.photoId
                    }
                }]
            });
            return parti;
        }
    }
}

export default Query;