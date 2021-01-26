// import { Sequelize } from "sequelize";
import { Context } from "../../global";
import findThrowAndReturn from "../utils/findThrowAndReturn";
import { fetchPhoto, fetchPhotosType } from "./PhotosArgTypes";

const Query = {
    myPhotos: async (_, _2, { db, user }: Context) => {
        const users = await user;
        let userId = "0";
        if (users?.userId) {
            userId = users?.userId;
        }
        return db.Photos.findAll({
            include: [
                {
                    model: db.Participations,
                    where: {
                        userId,
                    },
                },
            ],
        });
    },
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
        let photos = await db.Photos.findAll({
            order: [["createdAt", "DESC"]],
            offset: offset * (args.limit || 5),
            limit: args.limit || 5,
            subQuery: false,
        });
        if (photos.length === 0) {
            throw new Error("No photo left for feed.");
        }
        return photos;
    },
    photos: async (_, args: fetchPhotosType, { db }: Context) => {
        let { options } = args;
        let sql: string = `select "photos".* from photos`;
        let paginatedQuery: string;
        let commentsInnerAdded = false,
            whereAdded = false;
        let limit = options && options.limit ? options.limit : 20;

        if (options && options.eventId) {
            sql += ` INNER JOIN participations ON "participations"."participationId"="photos"."participationId" INNER JOIN events ON "participations"."eventId"="events"."eventId"`;
            if (options && options.commentsPlus) {
                commentsInnerAdded = true;
                sql += ` INNER JOIN comments ON "photos"."photoId"="comments"."photoId"`;
            }
            sql += ` WHERE "events"."eventId"='${options.eventId}'`;
            whereAdded = true;
        }
        if (options && options.commentsPlus && !commentsInnerAdded) {
            sql += ` INNER JOIN comments ON "photos"."photoId"="comments"."photoId"`;
        }
        if (options && options.likesPlus) {
            if (whereAdded)
                sql += ` AND cardinality("photos"."likes")>=${options.likesPlus}`;
            else
                sql += ` WHERE cardinality("photos"."likes")>=${options.likesPlus}`;
        }
        sql += ` GROUP BY "photos"."photoId"`;
        if (options && options.commentsPlus) {
            sql += ` HAVING COUNT("comments"."commentId")>=${options.commentsPlus}`;
        }
        paginatedQuery = sql;
        paginatedQuery += ` LIMIT ${limit}`;
        if (options && options.offset) {
            paginatedQuery += ` OFFSET ${options.offset * limit}`;
        }

        let paginatdePhotos = await db.sequelize.query(paginatedQuery);
        let totalPhotos = await db.sequelize.query(sql);
        let totalPhotosLength = totalPhotos[0].length;
        return {
            photos: paginatdePhotos[0],
            total: totalPhotosLength,
        };
        // select "photos".*, COUNT("comments"."commentId")
        // from photos
        // INNER JOIN participations ON "participations"."participationId"="photos"."participationId"
        // INNER JOIN events ON "participations"."eventId"="events"."eventId"
        // INNER JOIN comments ON "photos"."photoId"="comments"."photoId"
        // WHERE "events"."eventId"='9a1b31e7-b1ad-4fe8-8181-5ef1bfc4faa3'
        // AND cardinality("photos"."likes")>1
        // GROUP BY "photos"."photoId"
        // HAVING COUNT("comments"."commentId")>1

        // -- SELECT * FROM photos where cardinality("photos"."likes")>1;

        // -- select *
        // -- from photos
        // -- INNER JOIN participations ON "participations"."participationId"="photos"."participationId"
        // -- INNER JOIN events ON "participations"."eventId"="events"."eventId"
        // -- WHERE "events"."eventId"='0279f16f-5972-4d88-a894-0b90bb5e59ea'
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
