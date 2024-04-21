// import { useEffect} from "react"
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import OTPInput from "react-otp-input"
import {AiOutlineArrowLeft} from "react-icons/ai"
import Spinner from "../components/common/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
const VerifyEmail  = ()=>{
    const [otp,setOtp]=useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {loading,signupData}= useSelector((state)=>state.auth)
    console.log( "signupdata ->",signupData);
    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const verifyhandler = (e)=>{
        e.preventDefault();
        const {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                       }= signupData
        dispatch(signUp(accountType,
                        firstName,
                        lastName,
                        email,
                        password,
                        confirmPassword,
                        otp,
                        navigate))
    }
    return (
            <div className="min-w-full min-h-full  text-puregreys-5 m-auto">
            {
                loading?(<Spinner/>):(
                    <div className="flex flex-col w-full place-items-center gap-5">
                        <h1 className="text-3xl font-semibold text-center ">Verify Email</h1> 
                        <p className="text-sm text-puregreys-200 font-light">A verification code has been sent to you. Enter the code below</p>
                        <form onSubmit={verifyhandler} className="flex flex-col place-items-center">
                           <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props)=>
                            <input {...props}  className="lg:min-w-[4rem] lg:min-h-[5rem] sm:min-w-[3rem] sm:min-h-[4rem] rounded-md text-puregreys-5 bg-richblack-800"/>}
                            />
                            <button className="text-center mt-8 px-4 py-3 text-{13px} rounded-md font-bold
                                        bg-yellow-50 text-black 
                                    hover:scale-95 transition-all duration-200" type="submit">Verify Email</button>
                        
                        </form> 
                        <div className="flex flex-row justify-evenly w-6/12 ">
                        <div className="flex flex-row items-center justify-center gap-1
                         text-center  px-4 py-3 text-{13px} rounded-md 
                        hover:scale-95 transition-all duration-200 ">
                            <AiOutlineArrowLeft/>
                             <Link to="/login">
                                <p className="text-sm text-puregreys-5 ">Back To Login</p>
                            </Link>
                        </div>
                        <button className="text-center  px-4 py-3 text-{13px} rounded-md 
                        hover:scale-95 transition-all duration-200"
                        onClick={()=>dispatch(sendOtp(signupData.email,navigate))}>Resend OTP</button>
                        </div>  
                    </div>
                )
            }
            </div>
            
        
    )
}
export default VerifyEmail