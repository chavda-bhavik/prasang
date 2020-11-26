import { Context } from "../../global";
const Query = {
    users: (_, _2, {db}: Context, _3) => {
        return db.Users.findAll(); 
    },
    usersOne: async (_, _3, {db,user}: Context, _2) => {
        const users = await user; 
        let userId = '0';
        if(users?.userId){
            userId = users?.userId;
        }
        const findData = await db.Users.findOne({where:{userId}});
        return findData;
    }
}

export default Query;