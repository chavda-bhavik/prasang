import { Context } from "../../global";
import { addRole } from './RoleArgTypes';

const Mutation = {
    addRole:async(_,args: addRole,{db}:Context) => {
        return db.Roles.create({ 
            name:args.data.name 
        },{ 
            raw:true 
        })
        // const user =await db.Roles.create({ name:"User" },{ raw:true }) 
    }
}

export default Mutation;