import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/imgvideo/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import {loadStripe} from '@stripe/stripe-js';

 import {BASE_URL} from "../apis";

// //take publishable key from .env file
//  require('dotenv').config();

 const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

// // function loadScript(src) {
// //     return new Promise((resolve) => {
// //         const script = document.createElement("script");
// //         script.src = src;

// //         script.onload = () => {
// //             resolve(true);
// //         }
// //         script.onerror= () =>{
// //             resolve(false);
// //         }
// //         document.body.appendChild(script);
// //     })
// // }


//console.log("Info---", courses, userDetails, token);
//     //load the script
//     //const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
//         // if(!res) {
//         //     toast.error("RazorPay SDK failed to load");
//         //     return;
//         // }
//         // //initiate the order
//         // const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
//         //                         {courses},
//         //                         {
//         //                             Authorization: `Bearer ${token}`,
//         //                         })
//         // console.log("PRINTING orderResponse", orderResponse);
//         // if(!orderResponse.data.success) {
//         //     throw new Error(orderResponse.data.message);
//         // }
//         // console.log("PRINTING orderResponse", orderResponse);
//         // //options
//         // const options = {
//         //     key: process.env.RAZORPAY_KEY,
//         //     currency: orderResponse.data.paymentInformation.currency,
//         //     amount: `${orderResponse.data.paymentInformation.amount}`,
//         //     order_id:orderResponse.data.paymentInformation.id,
//         //     name:"StudyNotion",
//             // description: "Thank You for Purchasing the Course",
//             // image:rzpLogo,
//             // prefill: {
//             //     name:`${userDetails.firstName}`,
//             //     email:userDetails.email
//             // },
//             // handler: function(response) {
//                 //     //send successful wala mail
//                 //     sendPaymentSuccessEmail(response, orderResponse.data.paymentInformation.amount/100,token );
//                 //     verifyPayment({...response ,courses}, token, navigate, dispatch);
//                 //     //verifyPayment
//                 // }
//                 //     const paymentObject = new window.Razorpay(options);
//                 //     paymentObject.open();
//                 //     paymentObject.on("payment.failed", function(response) {
//                     //         toast.error("oops, payment failed");
//                     //         console.log(response.error);
//                     //     })
                
//                     // }
//                     // catch(error) {
//                         //     console.log("PAYMENT API ERROR.....", error);
//                         //     toast.error("Could not make Payment");
//                         // }
//                         // toast.dismiss(toastId);
export async function buyCourse(token, courses, userDetails ) {
    const toastId = toast.loading("Loading...");
//                         //using stripe
     try{
        
        const stripe = await loadStripe("pk_test_51O3NKUSAtwrR3FzmdoADyty2iNX3r5GDl68ozWHpTwq9a430Shctp3a42aDdF13gw3tp7pTUQNA9YzCBZIzuBIzW00YsJyMw9T");
        
        const bodydata ={
            courses,
            userDetails,
        }
        console.log("bodydata", bodydata);
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            //  Authorization: `Bearer ${process.env.STRIPE_SECRETKEY}`

        }
        let url = BASE_URL + "/payment/create-checkout-session";
        console.log("URL", url);
        const response = await fetch(url, {
            method:"POST",
            headers,
            body:JSON.stringify(bodydata),
        })
        const session = await response.json();
        const result = stripe.redirectToCheckout({
            sessionId: session.id,
        })
        if(result.error) {
            console.log(result.error.message);
            //toast.error(result.error.message);
        }
        }catch(err){
            console.log(err);
            toast.error("Could not make Payment");

        }
        toast.dismiss(toastId);
    }



        


async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

// //verify payment
// // async function verifyPayment(bodyData, token, navigate, dispatch) {
// //     const toastId = toast.loading("Verifying Payment....");
// //     dispatch(setPaymentLoading(true));
// //     try{
// //         const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
// //             Authorization:`Bearer ${token}`,
// //         })

// //         if(!response.data.success) {
// //             throw new Error(response.data.message);
// //         }
// //         toast.success("payment Successful, ypou are addded to the course");
// //         navigate("/dashboard/enrolled-courses");
// //         dispatch(resetCart());
// //     }   
// //     catch(error) {
// //         console.log("PAYMENT VERIFY ERROR....", error);
// //         toast.error("Could not verify Payment");
// //     }
// //     toast.dismiss(toastId);
// //     dispatch(setPaymentLoading(false));
// // }