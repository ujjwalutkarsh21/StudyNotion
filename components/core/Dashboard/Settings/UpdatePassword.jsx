import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/SettingsAPI"


export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showpassword, setShowpassword] = useState(false)
  const [shownewpassword, setShownewpassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (formData) => {
    console.log("password Data - ", formData)
    try {
      await changePassword(token, formData)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex text-richblack-50 font-semibold flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-700 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="password" className="lable-style">
                Current Password
              </label>
              <input
                type={showpassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Current Password"
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full font-normal rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"

                {...register("password", { required: true })}
              />
              <span
                onClick={() => setShowpassword((prev) => !prev)}
                className="absolute right-3 top-[55%] z-[10] cursor-pointer"
              >
                {showpassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.password && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newpassword" className="lable-style">
                New Password
              </label>
              <input
                type={shownewpassword ? "text" : "password"}
                name="newpassword"
                id="newpassword"
                placeholder="Enter New Password"
                
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full font-normal rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"

                {...register("newpassword", { required: true })}
              />
              <span
                onClick={() => setShownewpassword((prev) => !prev)}
                className="absolute right-3 top-[55%] z-[10] cursor-pointer"
              >
                {shownewpassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newpassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end relative right-6  gap-2">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <button type="submit"  className={`text-center flex gap-x-1  px-2 items-center py-1 text-{10px} rounded-md font-bold
         bg-yellow-50 text-black hover:scale-95 transition-all duration-200`}  >Update</button>
        </div>
      </form>
    </>
  )
}