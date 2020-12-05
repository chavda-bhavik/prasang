import { Context } from "../../global"

const Query = {
    photos: async (_, _2, { db }: Context) => {
        return db.Photos.findAll();
    }
}

export default Query