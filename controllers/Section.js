const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
require("dotenv").config();
exports.createSection = async(req,res)=>{
    try{
        //get data
        const {SectionName,courseID}= req.body;
        //validate 
        if(!SectionName || !courseID){
            return res.status(400).json({
                success:false,
                message:"Details are not sufficient",
            })
        }
        
        //create section
        const section = await Section.create({sectionName:SectionName});
        //update section into course
        
        const updatecourse = await Course.findByIdAndUpdate(
            courseID,
            {$push: {
                courseContent:section._id,
            }},
            {new:true},
        ).populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			});
        // TODO :use populate to replace subsection/section both in updatecourse
        //return response
        return res.status(200).json({
            success:true,
            message:"Section is created",
            updatecourse,
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Error,Section did'nt create,try again",
            error:error.message,
        })
    }
}
exports.updateSection = async(req,res)=>{
    try{
        //get data
        const {newSectionName,sectionID,courseId}=req.body;
        console.log(newSectionName,sectionID,courseId);
        //data validate
        if(!newSectionName || !sectionID){
            return res.status(400).json({
                success:false,
                message:"Details are not sufficient",
            })
        }
        //update
        const updatesection = await Section.findByIdAndUpdate(sectionID,{sectionName:newSectionName},{new:true});
        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }}).exec();

         return res.status(200).json({
            success:true,
            message:"Section is updated",
            data:course,
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Error,Section did'nt update,try again",
            error:error.message,
        })
    }
}
exports.deleteSection = async(req,res)=>{
    try{
        console.log("request received");
        const {sectionID,courseId} = req.body;
        console.log(sectionID,courseId);
        if(!sectionID){
            return res.status(400).json({
                success:false,
                message:"Details are not sufficient",
            })
        }
        await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionID,
			}
		})
        const section = await Section.findById(sectionID);
		
        await SubSection.deleteMany({_id: {$in: section.subSection}});

        await Section.findByIdAndDelete(sectionID);

        const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		}).exec();
         return res.status(200).json({
            success:true,
            message:"Section is deleted",
           data:course,
        })

    }catch(error){
         console.log(error);
         return res.status(500).json({
            success:false,
            message:"Internal Error,Section did'nt delete,try again",
            error:error.message,
        })

    }
}