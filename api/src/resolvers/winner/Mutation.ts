import { Context } from "../../global";
import { setWinner } from './WinnerArgTypes';

const Mutation = {
    setWinner: async (_, args: setWinner, { db }: Context) => {
        let photo = await db.Photos.findOne({
            where: {
                photoId: args.photoId
            }
        });

        return db.Winners.create({
            priceAmount: photo.priceAmount,
            participationId: photo.participationId
        });
    },
}

export default Mutation