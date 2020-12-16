import { Context } from "../../global"
import findThrowAndReturn from "../utils/findThrowAndReturn";
import { fetchPhoto } from "./PhotosArgTypes";

const Query = {
    photos: async (_, _1, { db }: Context) => {
        return db.Photos.findAll();
    },
    photo: async (_, args: fetchPhoto, { db }: Context) => {
        return findThrowAndReturn(db, "Photos", {
            where: {
                photoId: args.photoId
            }
        });
    }
}

export default Query