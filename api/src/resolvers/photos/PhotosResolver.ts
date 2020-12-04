import { Context } from "../../global";
import Participations from "../../models/Participations";
import Photo from "../../models/Photos";
import User from "../../models/Users";

const PhotosResolver = {
    comments: async (parent:Photo, _, { db }: Context) => {
        return db.Comments.findAll({ where: { photoId: parent.photoId }});
    },
    user: async (parent: Photo, _, { db }:Context) => {
        let particiapation:Participations = await db.Participations.findOne({
            where: {
                participationId: parent.participationId
            },
            include: [{
                model: User
            }]
        });
        return particiapation.user
    }
}

export default PhotosResolver