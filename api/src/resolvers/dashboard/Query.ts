import { Context } from "../../global";
import  sequelize from '../../models/_index';
import getUserId from '../utils/getUserId'

const Query = {
    Dashboard:async(_, _2, {db,req}:Context, _3) => {
        const userId = await getUserId(req)
        const findData = await db.Users.findOne({where:{userId}});
        const findRoleData = await db.Roles.findOne({where:{roleId:findData.roleId}});
        if(findRoleData.name!='Admin')
        {
            throw new Error("You Have Not Authorize to Access");
        }
        const currentUser= await db.Users.count({where:{
            roleId:findRoleData.roleId,
            IsEnable:true
        }});
        const ongoingEvent = await sequelize.sequelize.query(`SELECT Count(*) FROM public.events WHERE (CURRENT_DATE BETWEEN "startDate" AND "endDate")`);
        const commingEvent = await sequelize.sequelize.query(`SELECT Count(*) FROM public.events WHERE ("startDate" > CURRENT_DATE)`);
        const pastEvent = await sequelize.sequelize.query(`SELECT Count(*) FROM public.events WHERE ("endDate" < CURRENT_DATE)`);
        const datas = [{ ongoingEvent:ongoingEvent[0][0].count , commingEvent : commingEvent[0][0].count,pastEvent:pastEvent[0][0].count,currentUser:currentUser.toString() }];
        
        return datas;
    }
}

export default Query;