import { Context } from "../../global";
import  sequelize from '../../models/_index';
import getUserId from '../utils/getUserId'

const Query = {
    OngoingEvent:async(_, _2, {db,req}, _3) => {
        const userId = await getUserId(req)
        const findData = await db.Users.findOne({where:{userId}});
        const findRoleData = await db.Roles.findOne({where:{roleId:findData.roleId}});
        if(findRoleData.name!='Admin')
        {
            throw new Error("You Have Not Authorize to Access");
        }
        const ongoingEvent = await sequelize.sequelize.query(`SELECT Count(*) FROM public.events WHERE (CURRENT_DATE BETWEEN "startDate" AND "endDate")`);
        return ongoingEvent[0][0].count;
    },
    CommingEvent:async(_, _2,{db,req}, _3) => {
        const userId = await getUserId(req)
        const findData = await db.Users.findOne({where:{userId}});
        const findRoleData = await db.Roles.findOne({where:{roleId:findData.roleId}});
        if(findRoleData.name!='Admin')
        {
            throw new Error("You Have Not Authorize to Access");
        }
        const commingEvent = await sequelize.sequelize.query(`SELECT Count(*) FROM public.events WHERE ("startDate" > CURRENT_DATE)`);
        return commingEvent[0][0].count;
    },
    PastEvent: async (_, _2, {db,req}, _3) => {
        const userId = await getUserId(req)
        const findData = await db.Users.findOne({where:{userId}});
        const findRoleData = await db.Roles.findOne({where:{roleId:findData.roleId}});
        if(findRoleData.name!='Admin')
        {
            throw new Error("You Have Not Authorize to Access");
        }
        const pastEvent = await sequelize.sequelize.query(`SELECT Count(*) FROM public.events WHERE ("endDate" < CURRENT_DATE)`);
        return pastEvent[0][0].count;
        // const pastEvent =await db.Events.count({
        //     where:{
        //         startDate:{
        //             $between: ["2020-11-23 00:00:00+05:30","2020-11-23 00:00:00+05:30"]
        //         }
        //     }
        // }); 
    },
    CurrentUser: async (_, _2, {db,req}: Context, _3) => {
        const userId = await getUserId(req)
        const findData = await db.Users.findOne({where:{userId}});
        const findRoleData = await db.Roles.findOne({where:{roleId:findData.roleId}});
        if(findRoleData.name!='Admin')
        {
            throw new Error("You Have Not Authorize to Access");
        }
        return await db.Users.count({where:{
            roleId:findRoleData.roleId,
            IsEnable:true
        }});
    }
}

export default Query;