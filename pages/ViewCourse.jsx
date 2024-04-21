import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import { getFullDetailsOfCourse } from "../services/operations/course";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import {setCourseSectionData,setEntireCourseData,setTotalNoOfLectures,setCompletedLectures} from "../slices/viewCourseSlice";
const ViewCourse = () => {
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const [reviewModal,setReviewModal]=useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        const setCourseSpecificDetails  = async()=>{
            const courseData = await getFullDetailsOfCourse(courseId,token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec)=>{
                lectures +=sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
        // eslint-disable-next-line
    },[]);
    return ( 
    <>
        <div>
            <VideoDetailsSidebar setReviewModal={setReviewModal}/> 
            <div>
                <Outlet/>
            </div>
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
        );
}
 
export default ViewCourse;