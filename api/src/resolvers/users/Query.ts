import { Context } from "../../global";

const Query = {
    users: (_, _2, ctx: Context, _3) => {
        return ctx.db.Users.findAll(); 
    },
    usersOne: (_, args, ctx: Context, _2) => {
        let one = {};
        if(args.userId && args.email)
        {
            throw new Error("Please find according to email or userid");
        }
        else if(args.userId)
        {
            one = ctx.db.Users.findByPk(args.userId);
            if(!one){
                throw new Error("User Not Exits!!!")
            }
        }
        else
        {
            one = ctx.db.Users.findOne({where:{email:args.email}})
            if(!one){
                throw new Error("User Email Not Exits!!!")
            }
        }
        return one;
    }
}

export default Query;