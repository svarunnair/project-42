const cloudinary = require('cloudinary').v2

  cloudinary.config({
    cloud_name: "project",
    api_key: "732851349463457",
    api_secret: "LPafAAfUBl80IuJFB_2iO9hCD-8",
  });

 

module.exports = cloudinary



 // const opts = {
  //   overWriter:true,
  //   invalidate:true,
  //   resource_type:"auto"
  // }


  // module.exports = (image) => {
  //   return new Promise((resolve,reject)=>{
  //     cloudinary.uploader.upload(image,opts,(error,result)=>{
  //       if(result&&result.secure_url){
  //         console.log(result.secure_url)
  //         return resolve(result.secure_url)
  //       }
  //       console.log(error.message)
  //       return reject({message:error.message})
  //     })
  //   })
  // }
  