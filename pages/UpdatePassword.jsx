import { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { Link, useLocation } from "react-router-dom";
import {AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai"
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [formData, setFormData] = useState({
    newpassword: "",
    confirmPassword: "",
  })
   const { newpassword, confirmpassword } = formData

   const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
    const handleOnSubmit = (e) => {
         e.preventDefault()


    if (newpassword !== confirmpassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const token = location.pathname.split('/').at(-1);
    dispatch(resetPassword(newpassword,confirmpassword,token))
    // Reset
    setFormData({
      newpassword: "",
      confirmPassword: "",
    })
    
  }
    const {loading} = useSelector((state)=>state.auth);
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    return ( 
        <div className="w-4/12 m-auto text-richblack-5 ">
            {
                loading?(
                    <Spinner/>
                ):(
                    <div className="">
                        <h1 className="text-3xl text-center my-1">Choose new Password</h1>
                        <p className="text-center text-puregreys-200 font-light mb-6">Almost done. Enter Your New Password and you are all set. </p>
                        <form onSubmit={handleOnSubmit}>
                            <div className="flex flex-col gap-6">
                                <label className="relative">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    New Password <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="newpassword"
                                    value={newpassword}
                                    onChange={handleOnChange}
                                    placeholder="Enter Password"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                                    />
                                    <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                    >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                    </span>
                                </label>
                                <label className="relative">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Confirm Password <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={confirmpassword}
                                    onChange={handleOnChange}
                                    placeholder="Confirm Password"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                                    />
                                    <span
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                    >
                                    {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                    </span>
                                </label>
                                <button type={"submit"} 
                                className="text-center px-4 py-3 text-{13px} rounded-md font-bold
                                     bg-yellow-50 text-black mt-5
                                    hover:scale-95 transition-all duration-200">Reset Password</button>
                            </div>
                         </form>
                         <Link to="/login">
                         <p className="text-center text-sm text-richblack-5 mt-2 underline">Back to Login</p>
                         </Link>
                        </div>
) }
        </div>
     );
}
 
export default UpdatePassword;