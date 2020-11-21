const fs = require("fs");
const { v4:uuid } = require("uuid");

const storeUpload = async (upload) => {
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    // const uploadName = uuid()+"."+filename.split(".")[1];
    const path = `images/${filename}`;
    // (createWriteStream) writes our file to the images directory
    // const roundedCornerResizer = sharp().resize(300, 300).png();
    // .pipe(roundedCornerResizer)
    return new Promise((resolve, reject) => 
        stream
            .pipe(fs.createWriteStream(path))
            .on("finish", () => resolve({ path, filename, mimetype }))
            .on("error", reject)
    );
};
const processMultiUpload = async (files) => {
    let uploadedFiles = [];
    uploadedFiles = await Promise.all(files.map(storeUpload));
    return uploadedFiles;
};
const processSingleUpload = async (file) => {
    const uploadedFile = await storeUpload(file);
    return uploadedFile;
}

const Mutation = {
    hello: async (parent, args, ctx, info) => {
        const image = await processSingleUpload(args.image);
        console.log(image);
        return "Hello everyone!"
    }
}

export default Mutation