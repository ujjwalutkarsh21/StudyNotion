// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment,verifyPayment,sendPaymentSuccessEmail,createCheckoutSession } = require("../controllers/payment")
const { auth, isStudent} = require("../middlewares/Auth")
//router.post("/capturePayment", auth, isStudent,capturePayment)
//router.post("/verifyPayment",auth,isStudent,verifyPayment)
router.post("/sendPaymentSuccessEmail",auth,isStudent,sendPaymentSuccessEmail)
router.post("/create-checkout-session",auth,isStudent,createCheckoutSession);
module.exports = router