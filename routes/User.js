const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/Auth");
const {
    sendOtp,
    signUp,
    login,
    changePassword,

}= require("../controllers/Auth");
const { contactUsController   }=require("../controllers/Contactus");

const {
    resetPasswordtoken,
    resetPassword

}=require("../controllers/ResetPass");
//Route for login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOtp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)


// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordtoken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

//Contact response route
router.post("/contact",contactUsController);
module.exports = router;
