import { useState ,useEffect} from "react";
import {useForm} from "react-hook-form"
import countrycodes from "../../assets/static_data/countrycode.json"
// import { contactusEndpoint } from "../../services/apis";
 import{ apiConnector }from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis";
const ContactUsForm = () => {
    const [loading,setloading] = useState();
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm()
    const submitContactForm = async(data)=>{
        console.log(data);
        try{
            setloading(true);
            const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
            
            console.log(response);
            setloading(false);

        }catch(err){
            setloading(false);
            console.log(loading);
            console.log(err.message);
            console.log("error occured");

        }
    }

    
    useEffect(()=>{
        if (isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:""
            })
        }

    },[isSubmitSuccessful,reset])
    return ( 
    
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className="flex flex-col gap-4  w-full ">




                <div className="flex  justify-center gap-x-3  mx-auto w-8/12 "  >


                    <div className="flex flex-col justify-center items-center gap-2">
                        <label htmlFor="firstname" className="font-edu-sa font-thin text-sm">First-Name</label>
                        <input type="text" name="firstname" id="firstname" className="text-black text-center rounded-md w-full h-[2rem] "
                        placeholder="Enter your first name" 
                        {...register("firstname",{required:true})}/>
                        {
                            errors.firstname && (
                                <span className="text-pink-400 font-semibold">
                                    *Please enter Your name
                                </span>
                            )
                        }
                    </div> 


                    <div className="flex flex-col gap-2 text-center">  
                        <label htmlFor="lastname" className="font-edu-sa font-thin text-sm">Last-Name</label>
                        <input type="text" name="lastname" id="lastname" 
                        placeholder="Enter your last name" className="text-black text-center rounded-md w-full h-[2rem]  " 
                        {...register("lastname")}/>
                    </div>


                </div>




                <div className="flex flex-col gap-3 text-center justify-center items-center">  
                    <label htmlFor="email" className="font-edu-sa font-thin text-sm">Email-Address</label>
                    <input type="email" name="email" id="email" 
                    placeholder="Enter your email" className=" text-black text-center rounded-md w-8/12 h-[2rem]"
                    {...register("email",{required:true})}/>
                    {
                        errors.email && (
                            <span className="text-pink-400 font-semibold">
                                *Please enter Your Email Address
                            </span>
                        )
                    }
                </div>

                <div className=" flex flex-col gap-2 justify-center w-full items-center">
                    <label htmlFor="phonenumber" className="font-edu-sa font-thin text-sm text-center">
                        Phone Number
                    </label>
                    <div className="flex flex-row gap-3 w-8/12 h-[2rem]">
                        
                            <select 
                            name="dropdown"
                            id="dropdown"
                            {...register("countrycodes",{required:true})}
                            className="text-black w-[50px] rounded-md">
                                {
                                    countrycodes.map((element,index)=>{
                                        return (
                                            <option key={index} className=" text-black rounded-lg"
                                            value={element.code}>
                                                {element.code}-{element.country}
                                                
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <input type="number" maxLength={10} 
                                minLength={10} id="phonenumber"
                                name="phonenumber" className=" text-black rounded-md text-center w-full" 
                                placeholder="Enter your phonenumber"
                                {...register("phoneNo",{
                                    required:true,
                                    maxLength:{value:10,message:"invalid Phonenumber"},
                                    minLength:{value:8,message:"invalid Phonenumber"},})}
                                />
                                {errors.phoneNo && (
                                    <span className="text-pink-300 font-semibold">*{errors.phoneNo.message}</span>
                                )}
                        

                    </div>

                </div>




                <div className="flex flex-col items-center gap-2">
                    <label htmlFor="message" className="font-edu-sa font-thin text-sm">Message</label>
                    <textarea id="message" name="message" cols="30" rows="7" 
                    placeholder="Enter Your Message"
                    className="w-8/12 rounded-md text-center text-black "
                    {...register("message",{required:true})}>
                    </textarea>
                    {
                            errors.message && (
                                <span className="font-semibold text-pink-300">
                                    *Please enter Your Message 
                                </span>
                            )
                        }
                </div>


                <button type="submit" className={`text-center px-4 py-3 text-[13px]
                    rounded-md font-bold bg-yellow-50 text-black hover:bg-richblack-900 hover:text-richblack-5 w-4/12 mx-auto mt-5
                    hover:scale-95 transition-all duration-200`}>
                    Send Message

                </button>
               
            </div> 
        </form>

        
    );
}
 
export default ContactUsForm;