import { Context } from "../../global";
import getUserId from '../utils/getUserId'
const Query = {
    users: (_, _2, {db}: Context, _3) => {
        return db.Users.findAll(); 
    },
    usersOne: async (_, _3, {db,req}: Context, _2) => {
        // let one = {};
        const userId = getUserId(req)
        console.log(userId);
        const findData = await db.Users.findOne({where:{userId}});
        return findData;
    }
}

export default Query;