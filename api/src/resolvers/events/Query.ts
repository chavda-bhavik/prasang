import { Context } from "../../global";
import findThrowAndReturn from "../utils/findThrowAndReturn";
import { fetchAllEventsType, fetchEventType } from "./EventArgTypes";
// import transformDate from "../utils/transformDate";

const Query = {
    events: async (_, _1:fetchAllEventsType, { db }: Context) => {
        // if(typeof args.where.startDate === 'string') args.where.startDate = transformDate(args.where.startDate);
        // if(typeof args.where.endDate === 'string') args.where.endDate = transformDate(args.where.endDate);

        // let where:any = {};
        
        // if(args.where.all) {
        //     return db.Events.findAll();
        // }

        // if(typeof args.where.paid === 'boolean') {
        //     if(args.where.paid == true) where.fees = { [gt]: 0 }
        //     // else where.fees = { [Op.eq]: 0 }
        // }
        // if(args.where.ongoing) {
        //     where.endDate = { [Op.lte]: new Date() }
        // }
        // if(args.where.upcoming) {
        //     where.startDate = { [Op.gt] : new Date() }
        // }
        // if(args.where.categoryId) {
        //     where.categoryId = { [Op.eq] : args.where.categoryId }
        // }
        // if(args.where.startDate) {
        //     where.startDate = { [Op.gte]: args.where.startDate }
        // }
        // if(args.where.endDate) {
        //     where.endDate = { [Op.lte]: args.where.endDate }
        // }

        return db.Events.findAll();
    },
    event: async (_, args:fetchEventType, { db }: Context) => {
        return findThrowAndReturn(db, "Events", {
            where: { eventId: args.eventId }
        });
    }
}

export default Query;