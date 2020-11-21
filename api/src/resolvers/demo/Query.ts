const Query = {
    hello:(parent, args, ctx, info) => {
        console.log(args.image);
        return "Hello everyone!"
    }
}

export default Query