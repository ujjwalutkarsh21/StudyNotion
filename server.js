const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/PaymentRoute");
const courseRoutes  =require("./routes/Course");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 4000;
const db = require("./config/database");
const cloudinary = require("./config/Cloudinary");


app.use(cookieParser());
app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)
//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);


//default route

// app.get("/", (req, res) => {
// 	return res.json({
//         success:true,
// 		message:'Your server is up and running....'
// 	});
// });
cloudinary.cloudinaryconnect();
db.connect();
app.listen(port,()=>{
    console.log(`server started at ${port}`);
})
