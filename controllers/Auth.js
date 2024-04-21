const User = require("../models/User");
const OTP = require("../models/Otp");
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const { passwordUpdated } = require("../mails/passwordUpdate.js");
const mailSender = require("../utils/mailSender");
require("dotenv").config();
//send otp

exports.sendOtp = async (req, res) => {
    try {
        //fetch email from req body
        const { email } = req.body;
        // check if user already exist
        const checkUserPresent = await User.findOne({ email });
        //if user already exist return
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User Already registered",
            });
        }
        //generate otp
        let otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("otp generated :", otp);
        //check unique otp or not
        // const result = await OTP.findOne({ otp: otp });
        // while (result) {
        //     otp = otpgenerator.generate(6, {
        //         upperCaseAlphabets: false,
        //         lowerCaseAlphabets: false,
        //         specialChars: false,
        //     });
        //     result = await OTP.findOne({ otp: otp });
        // }
        const otppayload = { email, otp };
        //create an entry in db
        const otpBody = await OTP.create(otppayload);
        console.log("otpbodyyy..",otpBody);
        //return response successfully
        res.status(200).json({
            success: true,
            message: "Otp sent successfully",
            otp,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `${error.message}`,
        });
    }
};

//signup
exports.signUp = async (req, res) => {
    try {
        //data fetch from  req ki body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmpassword,
            accountType,
            otp,
        } = req.body;
        console.log("================================");
        console.log(req.body);
        //validate the user
        //! Frontend was sending confirmPassword but the required field was confirmpassword (body are case sensitive)
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmpassword
        ) {
            return res.status(404).json({
                success: false,
                message: "All fields is required !!!!this is issue  ",
            });
        }
        if (!otp) {
            return res.status(404).json({
                success: false,
                message: "OTP is required !!!!this is issue  ",
            });
        }
        // confirm password matching
        if (password !== confirmpassword) {
            return res.status(400).json({
                success: false,
                message: "confirm password and password is not matching",
            });
        }
        //check user already exists or not
        const existuser = await User.findOne({ email });
        if (existuser) {
            return res.status(400).json({
                success: false,
                message: "Email is already in registered",
            });
        }
        //find most recent OTP started for the user
        // const recentotp = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        // //validate OTP
        // if(recentotp?.otp?.length==0){
        //     return res.status(400).json({
        //         success:false,
        //         message:"OTP Not Found",
        //     })
        // }

        // else if(recentotp.otp!==otp){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Otp is not valid , try again",
        //     })
        // }
        const response = await OTP.findOne({email})
            .sort({ createdAt: -1 })
            .limit(1);
        console.log("email response ..", response);
        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "The OTP is not found",
            });
        } else if (otp !== response.otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }
        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //entry in the db
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);
        const ProfileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        const userinfo = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: ProfileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });
        //return res
        return res.status(200).json({
            success: true,
            user: userinfo,
            message: "new user registered Successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.message,
            message:
                "Internal Server Error,User cannot be registered , please try again",
        });
    }
};

//login
exports.login = async (req, res) => {
    try {
        //get data from req body
        const { email, password } = req.body;
        //validate data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "AlL fields are required",
            });
        }
        //user check exist or not
        const user = await User.findOne({ email }).populate(
            "additionalDetails"
        );
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup first",
            });
        }
        //password match
        //generate JWT
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 3600 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Password Incorrect",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure, please try again",
        });
    }
};
const sendemailchangepassword = async (email, body) => {
    try {
        const mailresponse = await mailSender(
            email,
            "Password Reset Email from Study Notion",
            body
        );
        console.log("Email sent successfully", mailresponse);
    } catch (err) {
        console.log(
            `error occured while sending changedpassword verification email- ${err}`
        );
        throw err;
    }
}

//changePassword
exports.changePassword = async (req, res) => {
    //get data from req body
    //get oldpassword,newpassword,confirmpassword
    console.log("user is this-->",req.user);
    const { password,  newpassword} = req.body;
    const {email}=req.user;
    //validation
    if (!password || !newpassword || !email) {
        return res.status(401).json({
            success: false,
            message: "All field are not filled",
        });
    }
    
    //update newpassword
    try {
        const verifyuser = await User.findOne({ email: email });
        if (!verifyuser) {
            return res.status(404).json({
                success: false,
                message: "user not found ",
            });
        }
        if (await bcrypt.compare(password, verifyuser.password)) {
            verifyuser.password = await bcrypt.hash(newpassword, 10);
            await verifyuser.save();
        }
    //     //send mail
        const emailbody = passwordUpdated(email, verifyuser.firstName);
        console.log(emailbody);
        // try {
        //     const mailresponse = await mailSender(
        //         email,
        //         "Changed Password Email from Study Notion",
        //         emailbody
        //     );
        //     console.log("Email sent successfully", mailresponse);
        // } catch (err) {
        //     console.log(
        //         `error occured while sending changedpassword verification email- ${err}`
        //     );
        //     throw err;
        // }
        await sendemailchangepassword(email,emailbody);

        //return response
        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        console.log("Error occurred while changing password:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
