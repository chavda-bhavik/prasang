import { Context } from "../../global";

const Query = {
    events: async (_, _2, { db }: Context) => {
        return db.Events.findAll();
    }
}

export default Query;