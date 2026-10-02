import ImageKit, { toFile } from '@imagekit/nodejs';
import ENV from '../config/config.js';

const client = new ImageKit({
  privateKey: ENV.IMAGEKIT_PRIVATE_KEY, 
});


export async function uploadFile({ buffer, fileName }){

    const response = await client.files.upload({

    file: await toFile(buffer),
    fileName: fileName,
    folder: "GOPS_GYM"

    });

    return response

}

export async function deleteFile(fileId){
  try {
  const response = await client.files.delete(fileId)
  return response
} catch(err){
  return null
}
}

