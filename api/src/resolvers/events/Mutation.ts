import { Context, fileField } from "../../global"
import findThrowAndReturn from "../utils/findThrowAndReturn";
import transformDate from "../utils/transformDate";
import { processSingleUpload } from "../utils/Upload";
import { AddEventType, editEventType, deleteEventType } from "./EventArgTypes";

const Mutation = {
    addEvent: async (_, args:AddEventType, { db }: Context ) => {
        let categoryExists = await db.EventCategories.findByPk(args.data.categoryId);
        if(!categoryExists) {
            throw new Error("Event category not found!");
        }
        if(args.data.startDate) args.data.startDate = transformDate(args.data.startDate);
        if(args.data.endDate) args.data.endDate = transformDate(args.data.endDate);
        if(args.data.startDate && args.data.endDate && args.data.startDate > args.data.endDate) {
            throw new Error("EndDate cannot be greater than StartDate!");
        }

        if(args.data.image) {
            let image:fileField = await processSingleUpload(args.data.image);
            args.data.imageUrl = image.path;
            delete args.data.image;
        }
        return await db.Events.create({
            ...args.data
        });
    },
    editEvent: async (_, args: editEventType, { db }: Context) => {
        let event = await findThrowAndReturn(db, "Events", { where: { eventId: args.eventId }});
        if(args.data.categoryId) {
            await findThrowAndReturn(db, "EventCategory", { where: { categoryId: args.data.categoryId }});
        }
        if(args.data.startDate) args.data.startDate = transformDate(args.data.startDate);
        else args.data.startDate = event.startDate;
        if(args.data.endDate) args.data.endDate = transformDate(args.data.endDate);
        if(args.data.startDate && args.data.endDate && args.data.startDate > args.data.endDate) {
            throw new Error("EndDate cannot be greater than StartDate!");
        }

        if(args.data.image) {
            let image:fileField = await processSingleUpload(args.data.image);
            args.data.imageUrl = image.path;
            delete args.data.image;
        }
        console.log(args.data);
        await db.Events.update({
            ...args.data
        }, {
            where: {
                eventId: args.eventId
            }
        });
        return findThrowAndReturn(db, "Events", { where: { eventId: args.eventId }} );
    },
    deleteEvent: async (_, args: deleteEventType, { db }:Context) => {
        let event = await findThrowAndReturn(db, "Events", { where: { eventId: args.eventId }});
        await db.Events.destroy({
            where: {
                eventId: args.eventId
            }
        });
        return event;
    }
}

export default Mutation