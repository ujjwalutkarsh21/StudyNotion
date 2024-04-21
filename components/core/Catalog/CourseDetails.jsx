import React from 'react'
import Error from '../../../pages/Error'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import toast from 'react-hot-toast'
import ConfirmationModal from "../../common/Confirmationmodal"
import CourseDetailCard from './CourseDetailCard'
import RatingStars from '../../common/RatingStars'
import { useState ,useEffect} from 'react';
import GetAvgRating from "../../../utils/avgRating"
import {formatDate} from "../../../utils/formatDate"
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../../../services/operations/paymentapi';
import {fetchCourseDetails} from "../../../services/operations/course"
const CourseDetails = () => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    
    const {loading} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const {courseId}  = useParams();
    
    const [courseData,setcurrentcourse] = useState(null);
    const [totalNoOfLectures,setTotalNoOfLectures] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const getCourseDetails = async()=>{
        try{
            //console.log(courseId);
            const response = await fetchCourseDetails(courseId);
            setcurrentcourse(response.data);
            console.log(response.data);
            
        }catch(error){
            console.log(error);
            console.log("unavailable to fetch course details");
        }
    }
    const handleBuyCourse = () => {
        
        if(user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor, you cant buy a course");
            return;
        }
        if(token) {
            buyCourse(token, [courseId], user);
            return;
        }
         setConfirmationModal({
            text1:"you are not Logged in",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
        })
    }
    useEffect(()=>{
        getCourseDetails();
        
        // eslint-disable-next-line
    },[courseId])
    const [durration, setduration] = useState(0);
    console.log(durration);
    useEffect(()=>{
         let lectures = 0;
         let durationlec = 0;
        courseData?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
            durationlec += sec.subSection.timeDuration

        })
        setTotalNoOfLectures(lectures);
        setduration(durationlec);

    },[courseData]);
    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(courseData?.ratingReviews);
        setAverageReviewCount(count);
    },[courseData])
    const [isActive, setIsActive] = useState(Array(0));
    // const handleActive = (id) => {
    //     setIsActive(
    //         !isActive.includes(id)
    //          ? isActive.concat(id)
    //          : isActive.filter((e)=> e !== id)

    //     )
    // }
     const {
        //_id,
        courseName,
        courseDescription,
        //thumbnail,
        //price,
        //whatYouWillLearn,
        courseContent,
        // ratingReviews,
        instructor,
        // studentsEnrolled,
        createdAt,
    } = courseData || {};
     if(loading || !courseData) {
        return (
            <div>
                Loading...
            </div>
        )
    }
     if(!courseData?.courseName) {
        return (
            <div>
                <Error />
            </div>
        )
    }

    

  return (
     <div className='flex flex-col  text-white'>
    {/* <div className='flex items-center'>
        <button className='bg-yellow-50 p-6 mt-10 '
        onClick={handleBuyCourse}>
            Buy Now
        </button>
    </div> */}

        <div className='relative flex flex-col justify-start p-8'>
            <p>{courseName}</p>
            <p>{courseDescription}</p>
            <div className='flex gap-x-2'>
                <span>{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${courseData.ratingReviews.length} reviews) `}</span>
                <span>{`(${courseData.studentEnrolled.length} students enrolled)`}</span>
            </div>

            <div>
                <p>Created By {`${instructor.firstName}`}</p>
            </div>

            <div className='flex gap-x-3'>
                <p>
                    Created At {formatDate(createdAt)}
                </p>
                <p>
                    {" "} English
                </p>
            </div>

            <div>
                <CourseDetailCard 
                    course = {courseData}
                    setConfirmationModal = {setConfirmationModal}
                    handleBuyCourse = {handleBuyCourse}
                />
            </div>
        </div>

        <div>
            <p> What You WIll learn</p>
            <div>
                {courseData.whatYouWillLearn}
            </div>
        </div>

        <div>
            <div>
                <p>Course Content:</p>
            </div>

            <div className='flex gap-x-3 justify-between'>

                   <div>
                    <span>{courseContent.length} section(s)</span>

                        <span>
                            {totalNoOfLectures} lectures
                        </span>
                        <span>
                            {/* {durration} total length */}
                        </span>
                   </div>

                   <div>
                        <button
                            onClick={() => setIsActive([])}>
                            Collapse all Sections
                        </button>
                   </div>

            </div>
        </div>





        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )

  
}

export default CourseDetails
