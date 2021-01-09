import { Context } from "../../global";
import { fetchPhotoComments } from "./CommentsArgTypes";

const Query = {
    comments: (_, args: fetchPhotoComments, { db }: Context) => {
        return db.Comments.findAll({
            where: {
                photoId: args.photoId,
            },
            order: [["createdAt", "DESC"]],
        });
    },
};

export default Query;
