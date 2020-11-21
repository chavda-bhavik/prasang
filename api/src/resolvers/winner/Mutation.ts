import { Context } from "../../global";
import {addWinner} from './WinnerArgTypes';

const Mutation = {
    addWinner: async (_, args: addWinner, ctx: Context) => {
        return ctx.db.Winners.create({
            winDate:args.winDate,
            priceAmount:args.priceAmount,
            userId:args.userId,
            eventId:args.eventId,
        }, {
            raw: true
        });
    },
}

export default Mutation