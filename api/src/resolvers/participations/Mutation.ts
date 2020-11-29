import { Context } from "../../global";
import Events from "../../models/Events";
import findThrowAndReturn from "../utils/findThrowAndReturn";
import { participate } from './ParticipationArgTypes'

const Mutation = {
    participate: async ( _, args:participate, { db, user }: Context ) => {
        // event exists and can register
        const event:Events = await findThrowAndReturn(db, "Events", {
            where: {
                eventId: args.eventId
            }
        });
        if(event.startDate > new Date()) {
            throw new Error("Registration closed for event!");
        }

        // check If user is not already participated
        let participtaion = await findThrowAndReturn(db, "Participations", {
            where: {
                eventId: args.eventId,
                userId: user?.userId
            }
        }, false);
        if(participtaion) {
            throw new Error("You're already participated in event!");
        }

        // participated in event
        return db.Participations.create({
            userId: user?.userId,
            eventId: args.eventId
        });
    }
}

export default Mutation;