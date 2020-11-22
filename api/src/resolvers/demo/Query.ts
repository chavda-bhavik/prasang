const Query = {
    hello:(_, args,) => {
        console.log(args.image);
        return "Hello everyone!"
    },
    world:(_,_2,_3,_4) => {
        return "Hello World!"
    }
}

export default Query