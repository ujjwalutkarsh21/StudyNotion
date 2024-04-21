const express = require("express");
const router = express.Router();
const {auth,isAdmin,isInstructor,isStudent} = require("../middlewares/Auth");
//course controllers
const {
    getcoursedetails,
    getAllCourses,
    createCourse,
    editCourse,
    deleteCourse,
    getInstructorCourses,
    getFullCourseDetails,
}= require("../controllers/Course");

//category controllers
const {
    createCategory,
    getAllCategorys,
    getcategorydetails,
    categoryPageDetails,
} = require("../controllers/Category");

//section controllers

const {
    deleteSection,
    updateSection,
    createSection,
}= require("../controllers/Section");

//subsection controllers
const {
    createSubSection,
    updateSubSection,
    deleteSubsection,
}= require("../controllers/SubSection");


//rating review controllers
const {
    getAvgRating,
    createRatingReview,
    getallRatingReview

}=require("../controllers/RatingAndReview");

//ratingreviews routes
router.post("/createRating", auth, isStudent, createRatingReview)
router.get("/getAverageRating", getAvgRating)
router.get("/getReviews", getallRatingReview);

//subsection routes

router.post("/createSubSection",auth,isInstructor,createSubSection);
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubsection)
//section routes

router.delete("/deleteSection",auth,isInstructor,deleteSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/createSection",auth,isInstructor,createSection);

//category routes
router.post("/categoryPageDetails",categoryPageDetails);
router.get("/getAllCategories",getAllCategorys);
router.get("/getcategorydetails",getcategorydetails);
router.post("/createCategory",auth,isAdmin,createCategory);

//course routes
router.delete("/deleteCourse",auth,isInstructor,deleteCourse);
router.get("/fetchInstructorCourses",auth,isInstructor,getInstructorCourses);
router.post("/editCourse",auth,isInstructor,editCourse);
router.get("/getCourseDetails",getcoursedetails);
router.get("/getAllCourses",getAllCourses);
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.post("/createCourse",auth,isInstructor,createCourse);
module.exports = router;