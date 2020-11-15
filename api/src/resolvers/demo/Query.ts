const Query = {
    hello:(_,_2,_3,_4) => {
        return "Hello everyone!"
    },
    world:(_,_2,_3,_4) => {
        return "Hello World!"
    },
    roles:async (_,_2,_3,_4)=>{
        
        // console.log("req ======>>"+req.query.roles);
        // const pets:Role[]= await Role.;
        // console.log(pets);
        return "Hello"
    }
}

export default Query