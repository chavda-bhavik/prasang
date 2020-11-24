import { Context } from "../../global";

const Query = {
    roles: (_, _2, { db }: Context) => {
        return db.Roles.findAll();
    }
}

export default Query;