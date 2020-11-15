import { Context } from "../../global";

const Query = {
    users: (_, _2, ctx: Context, _3) => {
        return ctx.db.Users.findAll();
    }
}

export default Query;