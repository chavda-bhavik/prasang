import { fileField } from "../../global";
import { v2 } from 'cloudinary'

v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

const storeUpload = async (upload):Promise<fileField> => {
    const { createReadStream } = await upload;
    const stream = createReadStream();
    return new Promise((resolve, reject) =>
        stream
        .pipe( 
            v2.uploader.upload_stream({ 
                tags: 'basic_sample',
                width: '300',
                height: '350',
                // dpr: 'auto',
                gravity: "auto",
                crop: "fill_pad",
                quality: "auto"
            }, function (err, image:any) {
                if (err) { 
                    // console.warn(err); 
                    return reject(err.message);
                }
                // console.log("* Same image, uploaded via stream");
                // console.log(image);
                // console.log("* " + image.url);
                resolve({ path:image.url, uploadName:"", mimetype:"" })
            })
        )
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