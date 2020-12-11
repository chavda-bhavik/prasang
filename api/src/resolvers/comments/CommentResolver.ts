import { Context } from "../../global"
import Comments from "../../models/Comments"

const CommentResolver = {
    photo: async (parent: Comments, _, { db }: Context) => {
        return db.Photos.findByPk(parent.photoId);
    },
    user: async (parent: Comments, _2, { db }: Context) => {
        return db.Users.findByPk(parent.userId);
    }
}

export default CommentResolver