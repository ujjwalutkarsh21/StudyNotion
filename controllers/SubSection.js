const { updateMany } = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadFileToCloudinary } = require("../utils/FileUploader");
require("dotenv").config();
//create subsection
exports.createSubSection = async(req,res)=>{
    try{
    //get all data
     const {title,description,sectionID}=req.body
     
    // console.log(req.body);
    //console.log(req.files);
     const {video}=req.files;
    //validate data 
    
    if(!title  || !sectionID || !description ){
         return res.status(400).json({
                success:false,
                message:"Details are not sufficient",
            })
    }
    if(!video){
        return res.status(400).json({
                success:false,
                message:"Video is not attached",
            })
    }
    //upload on cloudinary
    const uploadDetails = await uploadFileToCloudinary(video,process.env.FOLDER_NAME);
    // create subsection
    const newSubsection = await SubSection.create(
        {
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl: uploadDetails.secure_url,

        }
    )
    //update section
    const updateSection = await Section.findByIdAndUpdate({_id:sectionID},
        {
            $push :{
                subSection:newSubsection._id,
            },
           
        },
            {new:true},
        ).populate("subSection");;
        //TODO: console.log updates section here,after adding populate query
    //return res
    return res.status(200).json({
        success:true,
        message:"Subsection created",
        data:updateSection,
    })

    }catch(error){
         console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Error,SubSection did'nt create,try again",
            error:error.message,
        })

    }
}
//update subsection
exports.updateSubSection = async(req,res)=>{
    try {
      const { sectionID, title, description,subSectionId } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save();
      const updatedsection = await Section.findById(sectionID).populate("subSection")
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedsection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        error: error.message,
        message: "An error occurred while updating the section",

      })
    }
}
exports.deleteSubsection = async(req,res)=>{
     try {
      const { sectionID ,courseId,subsectionID} = req.body 
      console.log("bodyy",req.body);
      
      await Section.findByIdAndUpdate(
        { _id: sectionID },
        {
          $pull: {
            subSection: subsectionID,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subsectionID})
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
      const updatedsection = await Section.findById(sectionID).populate("subSection")
      return res.json({
        success: true,
        data: updatedsection,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
}
