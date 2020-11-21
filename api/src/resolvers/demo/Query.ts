const Query = {
    hello:(_, args,) => {
        console.log(args.image);
        return "Hello everyone!"
    }
}

export default Query