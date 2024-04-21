const Course = require("../models/Course");
const Category = require("../models/Category");
const Section = require("../models/Section");
const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const { convertSecondsToDuration } = require("../utils/ChangeTime");
const {uploadFileToCloudinary} = require("../utils/FileUploader");
require("dotenv").config();
//createCourse
exports.createCourse = async(req,res)=>{
    try{
        //fetch all data
        let{courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            instructions,
            category,
            tag
        } =req.body;
        console.log(req.body);
        let {status}=req.body;
        //get thumbnail
        console.log(req.files);
        const thumbnail = req.files.thumbnail;
        //validation
        if(!thumbnail){
            return res.status(401).json({
                success:false,
                message:"thumbnail is required",
            })
        }
         const _tag = JSON.parse(tag)
         const _instructions = JSON.parse(instructions);
         console.log(_instructions);
         console.log(_tag);
         if(!courseName || !courseDescription  ||!tag 
             || !whatYouWillLearn || !price || !category){
            return res.status(401).json({
                success:false,
                message:"All fields are requierd",
            })
        }
        if (!status || status === undefined) {
			status = "Draft";
		}
        //check for instructor
        // console.log(req.user.id);
        const userId = req.user.id;
        const instructorDetails = await User.findOne({_id : userId},
            {
            accountType:"Instructor",
            });
        if(!instructorDetails){
                return res.status(404).json({
                    success:false,
                    message:"Instructor not found"
                })
        }
        //Category validation
        const CategoryDetails = await Category.findById(category);
        if(!CategoryDetails){
                return res.status(404).json({
                    success:false,
                    message:"Category not found"
                })
        }
        //Upload Image to Cloudinary
        const thumbnailImage = await uploadFileToCloudinary(thumbnail,process.env.FOLDER_NAME);
        //create an entry for new course
        
        const newCourse  = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tags:_tag,
            Category:CategoryDetails._id,
            status:status,
            thumbnail:thumbnailImage.secure_url,
			      instructions:_instructions,

        })
        
        //instructor courselist update
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },{new:true}
        )
        //Category courselist update
        await Category.findByIdAndUpdate({
            _id:CategoryDetails._id,
        },{
        $push:{
                course:newCourse._id,
        }
        },{new:true},
        );
        return res.status(200).json({
            success:true,
            message:"course created succesfully",
            data:newCourse,
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"failed to create neew course",
            error:error.message,
        })
    }
}

//getallCourses
exports.getAllCourses = async(req,res)=>{
    try{
        const allCourses = await Course.find(
            { status: "Published" },{
            courseName:true,
            courseDescription:true,
            thumbnail:true,
            price:true,
            
            instructor:true,
            ratingReviews:true,
            studentEnrolled:true,
        }).populate("instructor").exec();
        
        return res.status(200).json({
            success:true,
            message:"All Course data fetched",
            data:allCourses,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            messaage:"Cannot Fetch Course Data",
            error:error.message,
        })
    }
}
//editcourse
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadFileToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("Category")
      .populate("ratingReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
//getcoursedetails
exports.getcoursedetails = async(req,res)=>{
    try{
      //extract courseid from headers



    const CourseId = req.header("CourseId");
    //console.log(CourseId);
    if(!CourseId){
        return res.status(404).json({
            success:false,
            message:"Course ID not form",
        })
    }
    const getcoursedetails = await Course.findById(CourseId)
    .populate({
        path:"instructor",
        populate:{
            path:"additionalDetails"
        }
    })
    .populate("Category")
    .populate({
        path:"courseContent",
        populate:{
            
                path:"subSection"
            
        }
    }).exec();
    	if (getcoursedetails.ratingReviews && getcoursedetails.ratingReviews.length > 0) {
						// Populate 'ratingReviews' only if it's not empty
						await getcoursedetails.populate("ratingReviews").execPopulate();
					}
    if(!getcoursedetails){
        return res.status(400).json({
            success:false,
            message:`Could not find course with - ${courseId}`,
        })
    }
    return res.status(200).json({
        success:true,
        message:"Course data fetched successfully",
        data:getcoursedetails,
    })
}catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"internal server error,could ot get coursedetails",
        error:error.message,
    })

}
}
// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}
//getfullcoursedetails
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("Category")
      .populate("ratingReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    if (courseDetails.status === "Draft") {
      return res.status(403).json({
        success: false,
        message: `Accessing a draft course is forbidden`,
      });
    }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}