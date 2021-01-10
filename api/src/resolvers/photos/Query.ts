import { Sequelize } from "sequelize";
import { Context } from "../../global";
import findThrowAndReturn from "../utils/findThrowAndReturn";
import { fetchPhoto, fetchPhotosType } from "./PhotosArgTypes";

const Query = {
    feed: async (
        _,
        args: { limit: number | undefined },
        { db, user }: Context
    ) => {
        if (!user) return;
        let offset = user?.viewIndex;
        await db.Users.update(
            {
                viewIndex: offset + 1,
            },
            {
                where: {
                    userId: user.userId,
                },
            }
        );
        return db.Photos.findAll({
            order: [["createdAt", "DESC"]],
            offset: offset * (args.limit || 5),
            limit: args.limit || 5,
            subQuery: false,
        });
    },
    photos: async (_, args: fetchPhotosType, { db }: Context) => {
        let { options } = args;
        let obj: any = {};
        let includes: any[] = [];
        let where: any[] = [];

        if (options && options.eventId) {
            includes.push({
                model: db.Participations,
                required: true,
                include: [
                    { model: db.Events, where: { eventId: options.eventId } },
                ],
            });
        }
        if (options && options.likesRange) {
            // console.log(options.likesRange)
            // where.push(
            Sequelize.where(
                Sequelize.fn("array_length", Sequelize.col("likes"), 1),
                <any>options.likesRange.start
            );
            // Sequelize.where(
            //     Sequelize.fn('array_length', Sequelize.col('likes'), 1),
            //     {
            //         [Op.and]:[
            //             { [Op.gte]: options.likesRange.start },
            //             { [Op.lte]: options.likesRange.end }
            //         ]
            //     }
            // )
            // )
        }
        // if(options && options.commantsRange) {
        // includes.push({
        //     model: db.Comments,
        //     required: true
        // })
        // include: [ {
        //     model: db.Comments,
        //     required: true,
        //     attributes: [ "commentId" ]
        // }],
        // attributes: [ Sequelize.fn('COUNT', Sequelize.col('Comments.commentId')) ],
        // logging: true
        // where.push(
        //     Sequelize.where(
        //         Sequelize.fn('COUNT', Sequelize.col('Comments.commentId')),
        //         {
        //             [Op.and]:{
        //                 [Op.gte]: 1,
        //             }
        //         }
        //     )
        // )
        // includes.push({
        //     model: db.Comments,
        //     attributes: [[Sequelize.fn('COUNT', Sequelize.col('Comments.commentId')), 1]]
        // });
        // }
        obj = {
            where,
            include: includes,
        };
        // console.log(JSON.stringify(obj));
        return db.Photos.findAll(obj);
    },
    photo: async (_, args: fetchPhoto, { db }: Context) => {
        return findThrowAndReturn(db, "Photos", {
            where: {
                photoId: args.photoId,
            },
        });
    },
};

export default Query;
