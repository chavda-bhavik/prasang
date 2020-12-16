import { Context, fileField } from "../../global"
import { addPhoto, likePhoto } from "./PhotosArgTypes";
import { processSingleUpload } from "../utils/Upload";
import Participations from "../../models/Participations";
import Events from "../../models/Events";
import Photo from "../../models/Photos";

const Mutation = {
    addPhoto: async (_, args:addPhoto, { db, user }: Context) => {
        if(!user) return;
        let participation:Participations|null = await db.Participations.findOne({
            where: {
                userId: user.userId,
                eventId: args.eventId
            }
        });
        if(!participation) throw new Error("You are not participated in this event!");
        if(participation.photoAdded) {
            throw new Error("You've already submitted photo for this event!");
        }

        let event:Events|null =  await db.Events.findByPk(participation.eventId);
        if(event && event.endDate < new Date()) {
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
    },
    likePhoto: async (_, args: likePhoto, { db, user }: Context) => {
        if(!user) return;
        
        let photo:Photo | null = await db.Photos.findByPk(args.photoId);
        if(!photo) throw new Error("Photo is not available!");

        let likes:string[] = photo.likes;
        let userIdIndex:number = likes.findIndex(id => id === user.userId);
        
        if(userIdIndex === -1) {
            likes.push(user.userId);
        } else {
            likes.splice(userIdIndex, 1);
        }

        await db.Photos.update({
            likes
        }, {
            where: {
                photoId: args.photoId
            }
        });

        return likes.length;
    }
}

export default Mutation