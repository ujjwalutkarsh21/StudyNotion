import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import Spinner from "../components/common/Spinner";
const ForgotPassword = () => {
    const [emailSent,setemailsent]=useState(false);
    const [email,setemail]=useState("");
    const dispatch = useDispatch();
    const{loading} = useSelector((state)=>state.auth);
    const submithandler = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setemailsent))
    }
    return ( 
        <div className="w-4/12 bg-richblack- m-auto  text-richblack-5 ">
            {
                loading?(<Spinner/>):
                <div>
                        <h1 className="text-3xl font-semibold m-2 text-center" >
                            {
                                !emailSent ?" Reset Your Password":"Check your Email"

                            }
                        </h1>
                        <p className="text-sm font-light mt-3 mb-6 text-center text-puregreys-200">
                            {
                                !emailSent?
                                (`Don't worry, we got you. we will email 
                                you instruction to reset your password. If you have access to your registered email we can try recover your account`
                                ):(`We have sent email to ${email}`)
                            }
                        </p>
                        <form  onSubmit={submithandler} className="flex flex-col place-items-center gap-5 ">
                            {
                                !emailSent && (
                                    <label>
                                        <p className="font-medium m-3 text-center">Email Address:</p>
                                        <input 
                                        
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-[200%] right-[50%] relative rounded-[0.5rem] bg-richblack-800 p-[0.5rem] text-richblack-5 mb-7" 
                                        required
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e)=>setemail(e.target.value)}
                                        placeholder="Enter Your Email Address"></input>
                                    </label>
    
                                )
                            }  
                            <button className="text-center px-4 py-3 text-{13px} rounded-md font-bold
                                        bg-yellow-50 text-black 
                                    hover:scale-95 transition-all duration-200" type="submit">
                                    {!emailSent ? "Reset Password" : "Resend Email"}
                            </button>
                                
                                
                        </form>
                        <div className="text-center text-sm my-3">
                            <Link to="/login">
                                <p className="underline">Back To Login</p>
                            </Link>
                        </div>

                </div>
            }
        </div>
     );
}
 
export default ForgotPassword;
