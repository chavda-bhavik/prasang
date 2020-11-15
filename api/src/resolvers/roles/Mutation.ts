import { Context } from "../../global";
import { addRole } from './RoleArgTypes';

const Mutation = {
    addRole:async(_,args: addRole,ctx:Context) => {
        return ctx.db.Roles.create({ 
            name:args.name 
        },{ 
            raw:true 
        })
        // const user =await ctx.db.Roles.create({ name:"User" },{ raw:true }) 
    }
}

export default Mutation;