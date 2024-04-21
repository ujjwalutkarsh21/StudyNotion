const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")
//reset PasswordToken
exports.resetPasswordtoken = async(req,res)=>{
    try{
    //get email
    const {email}= req.body;
    //chk if user exist
    const user = await User.findOne({email: email});
    if(!user){
        return res.json({
            success:false,
            message:"Your email is not registered with us",
        })
    }
    //generate token
 const rptoken = crypto.randomBytes(20).toString("hex");
   //update user by adding token and expires time
    const updateDetails = await  User.findOneAndUpdate(
        {email:email},
        {rptoken:rptoken,
        resetpasswordexpires:Date.now()+5*60*1000
        },
        {new:true}
    )
    //create url
    const url = `http://localhost:3000/update-password/${rptoken}`;
    //send mail containing that link
    await mailSender(email,"Password Reset Link",
    `Password Reset Link - ${url}`);
    //return response
    return res.json({
        success:true,
        message:"Email sent successfully, please check email and reset password",
    });
}catch(error){
    console.log(error);
    return res.send(500).json({
        success:true,
        message:"Something went wrong ,try again",
    })
    }
    
}


//reset Password
exports.resetPassword = async(req,res)=> {
    try{
    //data fetch
    const {password,confirmpassword}= req.body;
    const {token}=req.params || req.body;
    //validation
    if(password !==confirmpassword){
         return res.json({
        success:false,
        message:"Password not matching",
    })
    }
    //get userdetails from db
    const userdetails = await User.findOne({rptoken: token});
    //if no entry
    if(!userdetails){
        return res.json({
        success:false,
        message:"token invalid",
    })
    }
    //token time chk
    if(userdetails.resetPasswordExpires<Date.now()){
         return res.json({
        success:false,
        message:"token expired,please regenerate token",
    })
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password,10);
    await User.findOneAndUpdate(
        {
            rptoken:token,
        },
        {
            password:hashedPassword,
        },
        {
            new:true,
        },
        )
    //return response
    return res.status(200).jsonn({
        success:true,
        message:"password reset successful"
    })
}catch(error){
     console.log(error);
    return res.send(500).json({
        success:true,
        message:"Something went wrong ,try again",
    })

}
}