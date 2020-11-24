import { Context } from "../../global";

const Query = {
    users: (_, _2, ctx: Context, _3) => {
        return ctx.db.Winners.findAll();
    },
}

export default Query;