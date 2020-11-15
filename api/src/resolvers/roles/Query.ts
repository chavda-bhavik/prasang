import { Context } from "../../global";

const Query = {
    roles: (_, _2, ctx: Context, _3) => {
        return ctx.db.Roles.findAll();
    }
}

export default Query;