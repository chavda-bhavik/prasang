import { Context, fileField } from "../../global"
import { addPhoto } from "./PhotosArgTypes";
import { processSingleUpload } from "../utils/Upload";
import Participations from "../../models/Participations";
import Events from "../../models/Events";

const Mutation = {
    addPhoto: async (_, args:addPhoto, { db, user }: Context) => {
        if(!user) return;
        let participation:Participations = await db.Participations.findOne({
            where: {
                userId: user.userId,
                eventId: args.eventId
            }
        });
        if(!participation) throw new Error("You are not participated in this event!");
        if(participation.photoAdded) {
            throw new Error("You've already submitted photo for this event!");
        }

        let event:Events =  await db.Events.findByPk(participation.eventId);
        if(event.endDate < new Date()) {
            throw new Error("Event is ended!");
        }

        let image:fileField = await processSingleUpload(args.image);
        await db.Participations.update({
            photoAdded: true
        }, {
            where: {
                participationId: participation.participationId
            }
        });
        return await db.Photos.create({
            userId: user.userId,
            imageUrl: image.path,
            participationId: participation.participationId
        });
    }
}

export default Mutation