import { Context } from "../../global";
import Participations from "../../models/Participations";

const ParticipationResolver = {
    user: async (parent:Participations, _, { db }: Context) => {
        return db.Users.findByPk(parent.userId);
    },
    event: async (parent: Participations, _, { db }: Context) => {
        return db.Events.findByPk(parent.eventId);
    },
    photo: async (parent: Participations, _, { db }: Context) => {
        return db.Photos.findOne({
            where: {
                participationId: parent.participationId
            }
        })
    }
}

export default ParticipationResolver