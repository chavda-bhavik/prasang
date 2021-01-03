import { Context } from "../../global";
import findThrowAndReturn from "../utils/findThrowAndReturn";
import { fetchAllEventsType, fetchEventType } from "./EventArgTypes";
// import transformDate from "../utils/transformDate";

const Query = {
  events: async (_, args: fetchAllEventsType, { db }: Context) => {
    let sql: string = "";
    let { where } = args;

    if (where && where.status === "Ongoing") {
      sql = `select * from "events" where ( NOW() BETWEEN "events"."startDate" AND "events"."endDate")`;
    } else if (where && where.status === "Ended") {
      sql = `select * from "events" where ( "events"."endDate" < NOW() )`;
    } else if (where && where.status === "Upcoming") {
      sql = `select * from "events" where ( "events"."startDate" > NOW() )`;
    } else {
      sql = `select * from "events" where ( NOW() BETWEEN "events"."startDate" AND "events"."endDate")`;
    }
    if (where && where.paid) {
      sql += ` and "events"."fees" > 0`;
    }
    if (where && where.categoryId) {
      sql += ` and "events"."categoryId" = '${where.categoryId}'`;
    }
    sql += ` order by "events"."startDate"`;
    let events = await db.sequelize.query(sql);
    return events[0];
  },
  event: async (_, args: fetchEventType, { db }: Context) => {
    return findThrowAndReturn(db, "Events", {
      where: { eventId: args.eventId },
    });
  },
};

export default Query;
