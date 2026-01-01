import { cloudinary } from "./cloudinary";

export async function UploadImage(file: File, folder: string): Promise<any> {
  // console.log(file);

  try {
    const buffer = await file.arrayBuffer(); // returns a promise
    const bytes = Buffer.from(buffer);

    return new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: folder,
          },
          async (error, result) => {
            if (error) {
              reject(error.message);
            }
            resolve(result);
          },
        )
        .end(bytes);
    });
  } catch (err) {
    console.log(err);
  }
}
