import { Context } from "../../global";
import findThrowAndReturn from "../utils/findThrowAndReturn";
import { AddCommentType } from "./CommentsArgTypes";

const Mutation = {
    addComment: async (_, args: AddCommentType, { db, user }: Context) => {
        await findThrowAndReturn(db, "Photos", {
            where: {
                photoId: args.photoId
            }
        });
        return db.Comments.create({
            text: args.text,
            photoId: args.photoId,
            userId: user?.userId
        })
    }
}

export default Mutation