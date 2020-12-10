import { Context } from "../../global";
import Participations from "../../models/Participations";
import Photo from "../../models/Photos";
import User from "../../models/Users";

const PhotosResolver = {
    comments: async (parent:Photo, _, { db }: Context) => {
        return db.Comments.findAll({ where: { photoId: parent.photoId }});
    },
    user: async (parent: Photo, _, { db }:Context) => {
        let particiapation:Participations | null = await db.Participations.findOne({
            where: {
                participationId: parent.participationId
            },
            include: [{
                model: User
            }]
        });
        if(particiapation) return particiapation.user;
        else return null;
    },
    likes: async (parent: Photo) => {
        return parent.likes.length;
    },
    isLiked: async (parent: Photo, _, { user }:Context) => {
        if(!user) return false;
        return parent.likes.includes(user.userId);
    }
}

export default PhotosResolver