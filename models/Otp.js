const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const otpTemplate = require("../mails/emailVerificationTemplate")
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,

    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*1000,
    }

});
const sendverificationemail = async(email,otp)=>{
    try{
        const mailresponse = await mailSender(email,"Verification Email from Study Notion",otpTemplate(otp));
        console.log("Email sent successfully",mailresponse);

    }catch(err){
        console.log(`error occured while sending the verification otp- ${err}`);
        throw err;
    }
}
OTPSchema.pre("save",async function(next){
    if(this.isNew){
    await sendverificationemail(this.email,this.otp);
    }
    next();
})
module.exports = mongoose.model("OTP",OTPSchema);