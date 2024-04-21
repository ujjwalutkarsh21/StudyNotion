const RatingReview = require("../models/RatingReview");
const Course = require("../models/Course");
//createRatingReview
exports.createRatingReview = async(req,res)=>{
    try{
        //get data
        const {courseId,rating,review} = req.body;
        const userId = req.user.id;
        //validate enrolled or not
        const courseDetails = await Course.findOne(
            {_id:courseId,
             studentEnrolled:{$elemMatch:{$eq: userId}},   
            }
        );
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in this course"
            })
        }
        //validate review only once
        const alreadyReview = await RatingReview.findOne(
            {user:userId,
            course:courseId}
        );
        if(alreadyReview){
            return res.status(403).json({
                success:false,
                message:"user has already reviewed this course"

            })
        }
        //crweate rating
        const ratingreview = await RatingReview.create({
            rating:rating,
            review:review,
            course:courseId,
            user:userId

        });
        //course rating update
        await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    ratingReviews:ratingreview._id,
                }
            });
        //return res
        return res.status(200).json({
            success:true,
            message:"Rating review submitted",
            ratingreview:ratingreview

        })
    }catch(error){
         console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Error ,try again",
            error:error.message,
        })
    }
}
//get Avg Rating
exports.getAvgRating = async(req,res)=>{
    try{
        //get courseid
        const courseId = req.body.courseId;
        //calculate avg
        const result = await RatingReview.aggregate([
            {
                $match:{
                    course :new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg: "$rating"},
                }

            }
        ])
        //return avg rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }
        return res.status(200).json({
                success:true,
                message:"Avg Rating is 0 ,No Rating given till now",
                averageRating:0,
            })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Error ,try again",
            error:error.message,
        })
    }

}
//getallRatingReview
exports.getallRatingReview = async(req,res)=>{
    try{
    const allRatingReview = await RatingReview.find({})
    .sort({rating: "desc"})
    .populate({
        path:"user",
        select:"firstName lastName email image"
    }).populate(
        {
            path:"course",
            select:"courseName"
        }
    ).exec();
    return res.status(200).json({
        success:true,
        message:"All review fetched",
        data:allRatingReview,
    })
}catch(error){
    console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Error ,try again",
            error:error.message,
        })
}
}