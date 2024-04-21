const express = require("express");
const router = express.Router();
const {auth,isStudent} = require("../middlewares/Auth");
const {
    getEnrolledCourses,
    updateDisplayPicture,
    getallUserDetails,
    deleteAccount,
    updateProfile

}= require("../controllers/Profile");
router.put("/updateDisplayPicture",auth,updateDisplayPicture);
router.get("/getEnrolledCourses",auth,isStudent,getEnrolledCourses);
router.get("/getallUserDetails",auth,getallUserDetails);
router.put("/updateProfile",auth,updateProfile);
router.delete("/deleteAccount",auth,deleteAccount);
module.exports = router;

