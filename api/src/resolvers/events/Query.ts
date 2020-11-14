import { Context } from "../../global";

const Query = {
    eventCategories: (_, _2, ctx: Context, _3) => {
        return ctx.db.EventCategories.findAll();
    }
}

export default Query;