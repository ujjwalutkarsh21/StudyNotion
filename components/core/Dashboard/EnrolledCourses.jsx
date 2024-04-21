import { useEffect } from "react";
import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import  {getenrolledcourses}  from "../../../services/operations/profileAPI";
import Spinner from "../../common/Spinner";
import { useNavigate } from "react-router-dom";
const EnrolledCourses = () => {
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const [enrolledcourses,setEnrolledCourses] = useState(null);
    const getenrolledCourses = async()=>{
        try{
          //console.log("First");
            const response = await getenrolledcourses(token);
            //console.log("second");
            console.log(response);
            setEnrolledCourses(response.data);

        }catch(error){
            console.log(error);
            console.log("unavailable to fetch enrolled courses");
            
        }
    }
    useEffect(()=>{
        getenrolledCourses();
        // eslint-disable-next-line
    },[])
    return ( 
    <div >
        <div className="text-3xl text-richblack-50">Enrolled Courses</div>
        {
            !enrolledcourses?(<div className="flex justify-center items-center w-full h-full"><Spinner/></div>):
            !enrolledcourses.length?(<p className="grid h-[10vh] w-full place-content-center text-richblack-5">You have not enrolled in any course yet.</p>):

            (<div className="my-8 text-richblack-5">
                <div className="flex rounded-t-lg bg-richblack-500 ">
                    <p className="w-[45%] px-5 py-3">Course Name</p>
                    <p className="w-1/4 px-2 py-3">Durations</p>
                    <p className="flex-1 px-2 py-3">Progress</p>
                </div>
                <div>
                    {enrolledcourses.map((course,index,arr)=>
                    {return(
                    <div key={index}
                     className={`flex items-center border border-richblack-700 ${
                    index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                    }`}>
                        <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                        onClick={() => {
                            navigate(
                                `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                            )
                            }}
                        >
                            <img src={course.thumbnail} alt="thumbnail" className="h-14 w-14 rounded-lg object-cover"/>
                            <div className="flex max-w-xs flex-col gap-2">
                                <p className="font-semibold">{course.courseName}</p>
                                <p className="text-xs text-richblack-300">
                                    {course.courseDescription.length > 50
                                    ? `${course.courseDescription.slice(0, 50)}...`
                                     : course.courseDescription}</p>
                            </div>
                        </div>
                        <div className="w-1/4 px-2 py-3">{course?.duration?(course.duration):<></>}</div>
                        <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                            <p>Progress:{course.progressPercentage || 0}%</p>
                            <ProgressBar
                            completed={course.progressPercentage || 0}
                            height="8px"
                            isLabelVisible={false}/>
                        </div>
                    </div>)})}
                </div>
            </div>)
        }
    </div> );
    }
 
export default EnrolledCourses;