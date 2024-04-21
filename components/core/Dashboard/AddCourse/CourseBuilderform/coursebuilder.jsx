import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NestedView from "./NestedView";
import { useDispatch } from "react-redux";
import { setStep ,setEditCourse, setCourse} from "../../../../../slices/courseSlice";
import {BsArrowRightCircleFill} from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { createSection, updateSection } from "../../../../../services/operations/course";
const CourseBuilderform = () => {
    const {token} = useSelector(state => state.auth);   
    const dispatch = useDispatch();
    const {course} = useSelector(state => state.course);
    const [loading,setLoading] = useState(false);
    const {register,handleSubmit,formState:{errors},setValue} = useForm()
    const [editSectionName,setEditSectionName] = useState(null);  
    useEffect(()=>{
        // console.log("updated->",course);
    },[course])  
    const goback = () => {
        // window.history.back();
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
    }
    const gotoNext = () => {
        if(course?.courseContent?.length===0){
            toast.error("Please add atleast one section")
            return;
        }
        if(course.courseContent.some((section)=>section.subSection.length===0)){
            toast.error("Please add atleast one lecture in each section");
            return;
        }
            dispatch(setStep(3));
        }
        
    
    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName","");
    }
    const submithandler = async(data) => {
        setLoading(true);
        let result;
        if(editSectionName){
            result = await updateSection(
                {
                    newSectionName:data.sectionName,
                    sectionID:editSectionName,
                    courseId:course._id,
                },
                token
            )
        }else{
            // console.log(course);
            result = await createSection(
                {
                    SectionName :data.sectionName,
                    courseID:course._id,
                },token
            )
        }
        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName","");
        }
        setLoading(false);
}
const handleChangeEditSectionName = (sectionId,sectionName,courseId) => {
    if(editSectionName===sectionId){
        cancelEdit();
        return;
    }
    setEditSectionName(sectionId);
    //const section = course.courseContent.find((item)=>item._id===sectionId);
    setValue("sectionName",sectionName);
}
     return ( 
    <div className="text-richblack-5">
       <p className="text-lg  text-white font-semibold my-4">Course Builder</p>
       <form onSubmit={handleSubmit(submithandler)}>
            <div>
                <label htmlFor="sectionName" className="text-sm ">Section Name <sup className="text-yellow-25">*</sup></label>
                <input id="sectionName" type="text" 
                placeholder="Add a section name"
                className="w-full rounded-md border-richblack-700 
                bg-richblack-700 p-2 text-richblack-50 my-1"
                {...register("sectionName",
                {required:true})}/>
                {errors.sectionName && <p className="text-yellow-25">Section Name is required</p>}
            </div>
            <div className="flex gap-x-3">
                <button type="submit" className="flex flex-row  mt-1 hover:
                mb-2 border border-yellow-25 justify-center p-1 pr-2 border-dashed
                 hover:bg-yellow-50 hover:text-richblack-900
                transition duration-300 ease-in-out text-sm font-medium gap-2 rounded-lg bg-richblack-800 items-center ">
                    <AiOutlinePlusCircle className="text-yellow-25 hover:text-richblack-900 " />
                    {editSectionName ? "Edit Section Name" : "Create Section"}
                </button>
                {/* <button
                type="submit"
                className="flex items-center justify-center w-full mt-1 mb-2 px-4 py-2 border border-yellow-400 rounded-lg bg-gradient-to-r from-richblack-800 to-richblack-700 hover:bg-gradient-to-r
                 hover:from-yellow-400 hover:to-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50
                  text-yellow-50 text-sm font-semibold transition duration-300 ease-in-out"
                >
                <span className="mr-2">
                    <AiOutlinePlusCircle className="text-yellow-400" />
                </span>
                {editSectionName ? "Edit Section Name" : "Create Section"}
                </button> */}

                {editSectionName && <button onClick={cancelEdit} type="button" className="text-richblack-300 underline text-sm">Cancel Edit</button>}
            </div>
       </form>
       {course?.courseContent?.length > 0 &&
       (<NestedView handleChangeEditSectionName ={handleChangeEditSectionName } />)}
       <div className="mt-5 flex flex-row justify-end gap-4">
        <button onClick={goback} className="rounded-md cursor-pointer flex items-center px-4 py-1 font-semibold text-richblack-25 bg-richblack-500">
            Back
        </button>
        <button onClick={gotoNext} className="rounded-md cursor-pointer flex gap-2 items-center px-2 py-1 font-semibold  text-black bg-yellow-50">
            Next
            <BsArrowRightCircleFill/>
        </button>
       </div>

       </div>
       );
}
 
export default CourseBuilderform;