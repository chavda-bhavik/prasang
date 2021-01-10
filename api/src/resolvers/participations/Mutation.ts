import { Context } from "../../global";
import Events from "../../models/Events";
import findThrowAndReturn from "../utils/findThrowAndReturn";
import getUserId from "../utils/getUserId";
import { participate } from "./ParticipationArgTypes";

const Mutation = {
    participate: async (_, args: participate, { req, db }: Context) => {
        const userId = await getUserId(req);

        // event exists and can register
        const event: Events = await findThrowAndReturn(db, "Events", {
            where: {
                eventId: args.eventId,
            },
        });
        if (event.lastRegistraionDate < new Date()) {
            throw new Error("Registration closed for event!");
        }

        // check If user is not already participated
        let participtaion = await findThrowAndReturn(
            db,
            "Participations",
            {
                where: {
                    eventId: args.eventId,
                    userId: userId,
                },
            },
            false
        );
        if (participtaion) {
            throw new Error("You're already participated in event!");
        }

        // participated in event
        return db.Participations.create({
            userId: userId,
            eventId: args.eventId,
        });
    },
    participateCheck: async (_, args: participate, { req, db }: Context) => {
        const userId = await getUserId(req);

        // event exists and can register
        const event: Events = await findThrowAndReturn(db, "Events", {
            where: {
                eventId: args.eventId,
            },
        });
        if (event.startDate < new Date()) {
            throw new Error("Registration closed for event!");
        }

        // check If user is not already participated
        let participtaion = await findThrowAndReturn(
            db,
            "Participations",
            {
                where: {
                    eventId: args.eventId,
                    userId: userId,
                },
            },
            false
        );
        if (participtaion) {
            throw new Error("You're already participated in event!");
        }

        return participtaion;
    },
};

export default Mutation;
