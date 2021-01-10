import { Context, fileField } from "../../global";
import findThrowAndReturn from "../utils/findThrowAndReturn";
import transformDate from "../utils/transformDate";
import { processSingleUpload } from "../utils/Upload";
import { AddEventType, editEventType, deleteEventType } from "./EventArgTypes";

const Mutation = {
    addEvent: async (_, args: AddEventType, { db }: Context) => {
        let categoryExists = await db.EventCategories.findByPk(
            args.data.categoryId
        );
        if (!categoryExists) {
            throw new Error("Event category not found!");
        }
        if (args.data.startDate)
            args.data.startDate = transformDate(args.data.startDate);
        if (args.data.endDate)
            args.data.endDate = transformDate(args.data.endDate);
        if (args.data.lastRegistraionDate)
            args.data.lastRegistraionDate = transformDate(
                args.data.lastRegistraionDate
            );
        if (
            args.data.startDate &&
            args.data.endDate &&
            args.data.startDate > args.data.endDate
        ) {
            throw new Error("EndDate cannot be greater than StartDate!");
        }

        if (args.data.image) {
            let image: fileField = await processSingleUpload(args.data.image);
            args.data.imageUrl = image.path;
            delete args.data.image;
        }
        return await db.Events.create({
            ...args.data,
        });
    },
    editEvent: async (_, args: editEventType, { db }: Context) => {
        let event = await findThrowAndReturn(db, "Events", {
            where: { eventId: args.eventId },
        });
        if (args.data.categoryId) {
            await findThrowAndReturn(db, "EventCategories", {
                where: { categoryId: args.data.categoryId },
            });
        }
        if (args.data.startDate)
            args.data.startDate = transformDate(args.data.startDate);
        else args.data.startDate = event.startDate;
        if (args.data.endDate)
            args.data.endDate = transformDate(args.data.endDate);
        if (args.data.lastRegistraionDate)
            args.data.lastRegistraionDate = transformDate(
                args.data.lastRegistraionDate
            );
        if (
            args.data.startDate &&
            args.data.endDate &&
            args.data.startDate > args.data.endDate
        ) {
            throw new Error("EndDate cannot be greater than StartDate!");
        }

        if (args.data.image) {
            let image: fileField = await processSingleUpload(args.data.image);
            args.data.imageUrl = image.path;
            delete args.data.image;
        }
        console.log(args.data);
        await db.Events.update(
            {
                ...args.data,
            },
            {
                where: {
                    eventId: args.eventId,
                },
            }
        );
        return findThrowAndReturn(db, "Events", {
            where: { eventId: args.eventId },
        });
    },
    deleteEvent: async (_, args: deleteEventType, { db }: Context) => {
        let event = await findThrowAndReturn(db, "Events", {
            where: { eventId: args.eventId },
        });
        await db.Events.destroy({
            where: {
                eventId: args.eventId,
            },
        });
        return event;
    },
    dummyParticipations: async (
        _,
        args: {
            userId: string;
        },
        { db }: Context
    ) => {
        let userId = args.userId;
        try {
            await db.Participations.bulkCreate([
                { eventId: "0279f16f-5972-4d88-a894-0b90bb5e59ea", userId },
                { eventId: "97cd9de5-7505-43ed-ab4f-a47ea56e594c", userId },
                { eventId: "3eb48a8b-cf94-4a1b-bde0-ffb41458ccca", userId },
                { eventId: "581db388-a341-47d0-af44-483aaa59e61e", userId },
                { eventId: "998bd943-436c-4e6c-91a5-11909d6f7154", userId },
                { eventId: "64f50fcb-a3d0-4c71-a6bf-3a807305ec7f", userId },
                { eventId: "9a1b31e7-b1ad-4fe8-8181-5ef1bfc4faa3", userId },
                { eventId: "66bf8980-c30e-4adb-81b7-5565c67c688f", userId },
                { eventId: "8b755193-882f-459d-b2f3-afd1630b32df", userId },
                { eventId: "161eab04-9029-4137-b9dc-f6ea380b90c7", userId },
                { eventId: "9a8f4d6b-480e-4b79-8a42-9d90692652ad", userId },
                { eventId: "f983b5b9-611f-40af-8c4c-7d498bd932eb", userId },
            ]);
            return "done";
        } catch (error) {
            return error.toString();
        }
    },
};

export default Mutation;
