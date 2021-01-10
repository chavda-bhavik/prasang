import { Context } from "../../global";
import { participations } from "./ParticipationArgTypes";

const Query = {
    participations: async (_, args: participations, { user, db }: Context) => {
        let where: any = {};
        if (args.eventId) {
            where.eventId = args.eventId;
        }
        if (typeof args.photoAdded === "boolean") {
            where.photoAdded = args.photoAdded;
        }
        if (user && user.roles.name == "User") {
            where.userId = user.userId;
        }
        return db.Participations.findAll({ where });
    },
};

export default Query;
