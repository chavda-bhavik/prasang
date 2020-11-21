import { fileField } from "../../global";

const fs = require("fs");
const { v4:uuid } = require("uuid");

const storeUpload = async (upload):Promise<fileField> => {
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const uploadName = uuid()+"."+filename.split(".")[1];
    const path = `images/${uploadName}`;

    // (createWriteStream) writes our file to the images directory
    // const roundedCornerResizer = sharp().resize(300, 300).png();
    // .pipe(roundedCornerResizer)
    return new Promise((resolve, reject) =>
        stream
            .pipe(fs.createWriteStream(path))
            .on("finish", () => resolve({ path, uploadName, mimetype }))
            .on("error", reject)
    );
};
export const processMultiUpload = async (files) => {
    let uploadedFiles = [];
    uploadedFiles = await Promise.all(files.map(storeUpload));
    return uploadedFiles;
};
export const processSingleUpload = async (file):Promise<fileField> => {
    const uploadedFile = await storeUpload(file);
    return uploadedFile;
}