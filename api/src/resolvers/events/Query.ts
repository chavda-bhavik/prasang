import { Context } from "../../global";
import findThrowAndReturn from "../utils/findThrowAndReturn";
import { fetchAllEventsType, fetchEventType } from "./EventArgTypes";
// import transformDate from "../utils/transformDate";

const Query = {
  events: async (_, args: fetchAllEventsType, { db }: Context) => {
    let sql: string = "";
    let {
      where: { status, paid, categoryId },
    } = args;

    if (status === "Ongoing") {
      sql = `select * from "events" where ( NOW() BETWEEN "events"."startDate" AND "events"."endDate")`;
    } else if (status === "Ended") {
      sql = `select * from "events" where ( "events"."endDate" < NOW() )`;
    } else if (status === "Upcoming") {
      sql = `select * from "events" where ( "events"."startDate" > NOW() )`;
    } else {
      sql = `select * from "events" where ( NOW() BETWEEN "events"."startDate" AND "events"."endDate")`;
    }
    if (paid) {
      sql += ` and "events"."fees" > 0`;
    }
    if (categoryId) {
      sql += ` and "events"."categoryId" = ${categoryId}`;
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
