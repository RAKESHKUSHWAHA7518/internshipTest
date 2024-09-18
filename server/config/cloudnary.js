// import {v2 as cloudinary} from 'cloudinary';

// import fs from 'fs';
          
// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_cLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_SECRT_KEY 
// });

// const uploadoncloudinary = async(localFilePath)=>{
//     try{
//  if(!localFilePath) return null;
//   const response= await cloudinary.uploader.upload(localFilePath,{
//     resource_type:"auto"
//  })

//  fs.unlinkSync(localFilePath)
//  return response;
//  console.log("file is uploaded",response.url);
//  return response;
//     } catch(error){
//         fs.unlink(localFilePath)
//         return null;

//     }

// }

// export {uploadoncloudinary } 



const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRT_KEY  
});

const uploadoncloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Remove the file from local after uploading
    fs.unlinkSync(localFilePath);

    console.log("File is uploaded:", response.url);
    return response;
    
  } catch (error) {
    fs.unlinkSync(localFilePath); // Ensure file is removed in case of error
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

module.exports = { uploadoncloudinary };
