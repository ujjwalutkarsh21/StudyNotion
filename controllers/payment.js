//const {instance}= require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto = require("crypto");
const {paymentSuccessEmail }= require("../mails/paymentSuccessEmail");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mails/courseEnrollmentEmail");
exports.sendPaymentSuccessEmail = async(req,res)=>{
     const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo 
        const enrolledStudent = await User.findById(userId);
        const body = paymentSuccessEmail(`${enrolledStudent.firstName}`,amount/100,orderId, paymentId);
        const emailres = await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             body
        )
        console.log("-------------->");
        console.log("Email send---->", emailres);
        if(emailres){
            return res.status(200).json({success:true, message:"Email send successfully for payment success"});
        }
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}
//capture the payment and initiate the Razorpay order
exports.capturePayment  = async(req,res)=>{
    const {courses} = req.body;
    const userId = req.user.id || req.user._id;
    if(courses.length==0){
        return res.status(404).json("Course id is missing ");
    }
    let totalAmount =0;
    for( const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({
                    success:false,
                    message:"Course not found",
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already enrolled",
                })
            }
            totalAmount += course.price;
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Internal Server error, try again",
                error:error.message,
            })
        }
    }
    const options  = {
        amount: totalAmount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
        // notes:{
        //     userId:userId,
        //     courseId:courses,
        // }
    }
    try{
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success:true,
            paymentInformation:paymentResponse,
        })
    }catch(error){
        console.log(error);
        // return res.status(500).json({
        //     success:false,
        //     message:"Internal Server error Could not initiate order, try again",
        //     error:error.message,
        // })
    }
}
// exports.verifyPayment = async(req,res)=>{
//     //console.log(req.body);
//     //console.log("--------");
//     //console.log(req.user);
//     const razorpay_orderid = req.body.razorpay_order_id;
//     const razorpay_paymentid = req.body.razorpay_payment_id;
//     const razorpay_signature = req.body.razorpay_signature;
//     const courses = req.body.courses;
//     const userid = req.user?.id || req.user?._id;
//     if(!razorpay_orderid || !razorpay_paymentid || !razorpay_signature || !courses || !userid){
//         return res.status(400).json({
//             success:false,
//             message:"Payment details are missing",
//         })
//     }
//     let body = razorpay_orderid + "|" + razorpay_paymentid;
//     const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET ).update(body.toString()).digest("hex");
//     if(expectedSignature === razorpay_signature){


//         //Main Action
//         await enrolStudentInCourse(courses,userid,res);

//         return res.status(200).json({success:true,message:"Payment verified"});
        
//     }else{
//         return res.status(400).json({
//             success:false,
//             message:"Payment verification failed",
//         })
//     }

// }
const enrolStudentInCourse = async(courses,userid,res)=>{
  if(courses.length==0){
    return res.status(404).json("Course id is missing ");
  }
  if(!userid){
    return res.status(404).json("User id is missing ");
  }
  for (const course of courses){
    try{
      //find the student and check if he has course then return already registered
      const uid = new mongoose.Types.ObjectId(userid);
      const courseid = new mongoose.Types.ObjectId(course);
      const student = await User.findOne({_id:uid,courses:courseid});
      if(student){
        return res.status(200).json({
          success:false,
          message:"Student is already enrolled",
        })
      }
      const enrolledcourse = await Course.findOneAndUpdate(
        {_id:course},
        {$push:{studentEnrolled:userid}},
        {new:true},
      );
      if(!enrolledcourse){
        return res.status(404).json({
          success:false,
          message:"Course not found",
        })
      }
      console.log(enrolledcourse);
      //find the student and add the course to their list of course
      const enrolledStudent = await User.findOneAndUpdate(
        {_id:userid},
        {$push:{courses:course}},
        {new:true},
      );
      if(!enrolledStudent){
        return res.status(404).json({
          success:false,
          message:"Student not found",
        })
      }
      console.log(enrolledStudent);
      //confirmation mail send
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledcourse.courseName}`,
        courseEnrollmentEmail(enrolledcourse.courseName, `${enrolledStudent.firstName}`)
      ) 
      console.log("Email send", emailResponse);
    }catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server Error",
        error:error.message,
      })
    }
  }
}
// const enrolStudentInCourse = async(courses,userid,res)=>{
//     if(courses.length==0){
//         return res.status(404).json("Course id is missing ");
//     }
//     if(!userid){
//         return res.status(404).json("User id is missing ");
//     }
//     for (const course of courses){
//         try{
//             //find the student and check if he has course then return already registered
//             const uid = new mongoose.Types.ObjectId(userid);
//             const courseid = new mongoose.Types.ObjectId(course);
//             const student = await User.findOne({_id:uid,courses:courseid});
//             if(student){
//                 return res.status(200).json({
//                     success:false,
//                     message:"Student is already enrolled",
//                 })
//             }
//         const enrolledcourse = await Course.findOneAndUpdate(
//             {_id:course},
//             {$push:{studentEnrolled:userid}},
//             {new:true},
//         );
//         if(!enrolledcourse){
//             return res.status(500).json({
//                 success:false,
//                 message:"Course not found",
//             })
//         }
//         console.log(enrolledcourse);
//         //find the student and add the course to their list of course
//         const enrolledStudent = await User.findOneAndUpdate(
//             {_id:userid},
//             {$push:{courses:course}},
//             {new:true},
//         );
//         if(!enrolledStudent){
//             return res.status(500).json({
//                 success:false,
//                 message:"Student not found",
//             })
//         }
//         console.log(enrolledStudent);
//         //confirmation mail send
//       const emailResponse = await mailSender(
//             enrolledStudent.email,
//             `Successfully Enrolled into ${enrolledcourse.courseName}`,
//             courseEnrollmentEmail(enrolledcourse.courseName, `${enrolledStudent.firstName}`)
//         ) 
//         console.log("Email send", emailResponse);
//          }catch(error){
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:"Internal Server Error",
//                 error:error.message,
//             })
//         }
//     }
// } 
exports.createCheckoutSession = async(req,res)=>{
    //console.log(req.body);
    const {courses} = req.body;
    const userId = req.user.id || req.user._id;
    if(courses.length==0){
        return res.status(404).json("Course id is missing ");
    }
    try{

        //await enrolStudentInCourse(courses,userId,res);
    const enrolStudentInCourseResponse = await enrolStudentInCourse(courses,userId,res);
    if (enrolStudentInCourseResponse) {
      return;
    }
    
        
    const coursesData = await Course.find({_id:{$in:courses}});
    console.log(coursesData);
    const listCoursesData = coursesData.map((course)=>{
        return {
            price_data:{
                currency:"inr",
                product_data:{
                    name:course.courseName,
                },
                unit_amount:course.price*100,
            },
            quantity:1,
        }
    })
    console.log("main one -->>",listCoursesData);
    const session = await stripe.checkout.sessions.create({
            lineItems:listCoursesData,
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL,
  });
  console.log(session);

  return res.status(200).json({ id: session.id });
}catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal Server Error",
        error:error.message,
    })

}
}



