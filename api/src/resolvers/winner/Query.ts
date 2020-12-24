import { Context } from "../../global";
import { winners } from "./WinnerArgTypes";

const Query = {
    winners: (_, args: winners, { db }: Context, _3) => {
        let includes:any[] = [];
        if(args.eventId) {
            includes.push(
                {
                    model: db.Participations,
                    required: true,
                    include:[
                        { model: db.Events, where: { eventId: args.eventId } }
                    ]
                }
            )
        }
        return db.Winners.findAll({
            include: includes
        });
    }
}

export default Query;