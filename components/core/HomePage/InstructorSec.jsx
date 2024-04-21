import instructorImage from "../../../assets/imgvideo/Images/Instructor.png"
import { CTAButton } from "./CTAbutton";
import { HighlightText } from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
const InstructorSec = () => {
    return ( 
    <div className="bg-richblack-900 ">
        <div className="lg:flex lg:flex-row   gap-20 items-center sm:flex sm:flex-col">
            <div className="lg:w-[50%] sm:w-[100%] mx-16 my-10">
                    <img src={instructorImage} alt="photos"  className="rounded-full drop-shadow-2xl shadow-2xl shadow-richblack-300"/>
            </div>
            <div className="w-[50%] flex flex-col gap-8" >
                <div className="text-4xl  w-[50%] font-semibold text-white sm:w-[100%] sm:text-center">
                    Become an 
                    <HighlightText text={"Instructor"}/>
                </div>
                <p className="text-richblack-300 font-medium w-[80%]  sm:w-[85%] sm:text-center">
                    Instructors from around the world teach millions of students on StudyNotion . We provide the tools and skills to teach what you have
                </p>
                <div className="mt-8 flex justify-center ">
                     <CTAButton active={true} 
                     text={
                    
                        <div className="flex gap-2 items-center">   
                        Start Teaching Today
                        <FaArrowRight />
                        </div>} linkto={"/signup"}/>
                    
                </div>
               
            </div>
        </div>
    </div> );
}
 
export default InstructorSec;