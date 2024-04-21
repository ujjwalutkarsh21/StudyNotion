const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course")
//const {uploadFileToCloudinary} = "../utils/FileUploader.js"
const { uploadFileToCloudinary } = require("../utils/FileUploader");
exports.updateProfile = async(req,res)=>{
    try{
        //get data
        const {gender,dateOfBirth,contactNumber,about} = req.body;
        //get userId
        const id = req.user.id;
        //validATE data 
        if( !id){
            return res.status(400).json({
                success:false,
                message:"Details/userId are not found",
            })
        }
        //profile find
        const existUser = await User.findById(id);
        if(!existUser){
             return res.status(404).json({
                success:false,
                message:"user not found",
            })
        }
        const profileId = existUser.additionalDetails._id;
        const existProfile = await Profile.findById(profileId);
        // let updatedProfiledata;
        if(!existProfile){
            return res.status(404).json({
                success:false,
                message:"Profile not found",
            })
        }
        //update profile
        
        if(lastName){

        }
        if(gender){
            existProfile.gender = gender;
        }
        if(typeof dateOfBirth === "string" && dateOfBirth !== ""){
            existProfile.dateOfBirth = dateOfBirth;
        }
        if(about!==""){
            existProfile.about = about;
        }
        if(contactNumber){
            existProfile.contactNumber = contactNumber;
        }
        try{ 
           await existProfile.save();
        }
        catch(er){
			console.log(er);
			return res.status(400).json({
			success: false,
			error: error.message,
      
		});

		}
        //return res
        return res.status(200).json({
            success:true,
            message:"Profile updated",
            // updatedProfiledata
            updatedProfiledata:existProfile,
            existUser:existUser
        })
        

    }catch(error){
         console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Error,Profile did'nt update,try again",
            error:error.message,
        })
    }
}
//delete profile
exports.deleteAccount = async(req,res)=>{
    try{
    //get userid
    
    const userid = req.user.id;
    const existUser = await User.findOne({_id:userid});
    if(!existUser){
             return res.status(404).json({
                success:false,
                message:"user not found",
            })
        }
        //get profileid
      const profileId = existUser.additionalDetails._id;
      const existProfile = await Profile.findById(profileId);
        if(!existProfile){
            return res.status(404).json({
                success:false,
                message:"Profile not found",
            })
        }  
        //delete profile
        await Profile.findByIdAndDelete(profileId);
        //delete user from studentEnrolled array from all Course
        let courses = await Course.find();
        for(const course of courses){
            if(course.studentEnrolled.includes(userid)){
                 const uid = new mongoose.Types.ObjectId(userid);
                course.studentEnrolled = course.studentEnrolled.filter((studentid)=>studentid!==uid);
            }
            await course.save();
        }
      //delete user
        await User.findByIdAndDelete(userid);
        return res.status(200).json({
            success:true,
            message:"Profile & Userdeleted",
            
        })}
        catch(error){
             console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Error,Profile did'nt delete,try again",
            error:error.message,
        })

        }
      }
        //getallUserDetails
  exports.getallUserDetails=async(req,res)=>{
      try{
          const userid = req.user.id;
          const userdetails = await User.findById(userid).populate("additionalDetails").exec();
          return res.status(200).json({
              success:true,
              user:userdetails,
              message:"details retrieved",
          })
      }catch(error){
            console.log(error);
  res.status(500).json({
      success:false,
      message:"Internal Error,details not retrieved,try again",
      error:error.message,
  })
      }
  }

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadFileToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      //console.log(image)
      const existUser= await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      return res.send({
        success: true,
        message: `Image Updated successfully`,
        data: existUser,
      })
    } catch (error) {
		console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      //console.log(userId)
      const userDetails = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
      //console.log(userDetails);  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails._id}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
