import { Context } from "../../global";
import  sequelize from '../../models/_index';

const Query = {

    Dashboard:async(_, _2, {db}:Context, _3) => {        
        const currentUser= await db.Users.count({where:{
            IsEnable:true
        }});
        const ongoingEvent:any = await sequelize.sequelize.query(`SELECT Count(*) FROM public.events WHERE (CURRENT_DATE BETWEEN "startDate" AND "endDate")`);
        const commingEvent:any = await sequelize.sequelize.query(`SELECT Count(*) FROM public.events WHERE ("startDate" > CURRENT_DATE)`);
        const pastEvent:any = await sequelize.sequelize.query(`SELECT Count(*) FROM public.events WHERE ("endDate" < CURRENT_DATE)`);
        const datas = [{ ongoingEvent:ongoingEvent[0][0].count , commingEvent : commingEvent[0][0].count,pastEvent:pastEvent[0][0].count,currentUser:currentUser.toString() }];
        
        return datas;
    }
}

export default Query;