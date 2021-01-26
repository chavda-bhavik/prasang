import { Context } from "../../global";
import { participations, user_participations } from "./ParticipationArgTypes";
const { Op } = require("sequelize");

const Query = {
    participations: async (_, args: participations, { user, db }: Context) => {
        let include:any = {};
        let where: any = {};
        if (args.eventId) {
            where.eventId = args.eventId;
        }
        if (typeof args.photoAdded === "boolean") {
            where.photoAdded = args.photoAdded;
        }
        if (user && user.roles.name == "User") {
            where.userId = user.userId;
            include = {
                model: db.Events,
                where: {
                    endDate: {
                        [Op.gt]: new Date()
                    }
                }
            }
        }
        return db.Participations.findAll({ 
            where,
            include
        });
    },
    user_participations: async (_, args:user_participations, { db }: Context) => {
        if(args.photoId)
        {
            const parti = db.Participations.findAll({
                include:[{
                    model:db.Photos,where:{
                        photoId:args.photoId
                    }
                }]
            });
            return parti;
        }
    }
};

export default Query;
