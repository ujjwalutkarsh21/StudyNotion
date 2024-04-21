import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCourse } from "../../../../../slices/courseSlice";
import {  useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { createSubSection,updateSubSection } from "../../../../../services/operations/course";
import { RxCross1 } from "react-icons/rx";
import Upload from "./Upload";
const SubSectionModal = ({modalData,setModalData,add=false,view=false,edit=false}) => {
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const {course} = useSelector(state => state.course)
    const  {register,setValue,getValues, handleSubmit, formState: { errors }} = useForm();
    useEffect(() => {
        if(view || edit){
            setValue("LectureTitle",modalData.title);
            setValue("LectureDesc",modalData.description);
            setValue("LectureVideo",modalData.videoUrl);
        }
        // eslint-disable-next-line
    }, []);
    const isformupdated = () => {
        const {LectureTitle,LectureDesc,LectureVideo} = getValues();
        if(LectureTitle !== modalData.title || LectureDesc !== modalData.description || LectureVideo !== modalData.videoUrl){
            return true;
        }else{
            return false;

        }
    }
    const handleEditSubSection = async() => {
        const currentvalues = getValues();
        const formData = new FormData();
        formData.append("sectionID",modalData.sectionID);
        formData.append("subSectionId",modalData._id);
        if(currentvalues.LectureTitle !== modalData.title){
            formData.append("title",currentvalues.LectureTitle);
        }
        if(currentvalues.LectureDesc !== modalData.description){
            formData.append("description",currentvalues.LectureDesc);
        }
        if(currentvalues.LectureVideo !== modalData.videoUrl){
            formData.append("video",currentvalues.LectureVideo);
        }
        setLoading(true);
        const result = await updateSubSection(formData,token);
        if(result){
        const updatedCourse = course.courseContent.map((section)=>(section._id === modalData.sectionID ? result:section));
        const updatedCourseData = {...course,courseContent:updatedCourse};
        dispatch(setCourse(updatedCourseData));
}
            
        setModalData(null);
        setLoading(false);

    }
    const onSubmit = async(data) => {
        if(view){
            return;
        }
        if(edit){
            if(!isformupdated){
                toast.error("No changes made to the form");
            }
            else{
                handleEditSubSection();
            }
            return;
        }

        const formData = new FormData();
        //console.log(modalData);
        //console.log("dataaa...",data);
        formData.append("sectionID",modalData);
        formData.append("title",data.LectureTitle);
        formData.append("description",data.LectureDesc);
        formData.append("video",data.LectureVideo);
        //console.log("formdata-->",formData.get("title"));
        setLoading(true);
        const result = await createSubSection(formData,token);
        const updatedCourse = course.courseContent.map((section)=>(section._id === modalData? result:section));
        const updatedCourseData = {...course,courseContent:updatedCourse};
        if(result){
            dispatch(setCourse(updatedCourseData));

        }
        setModalData(null);
        setLoading(false);
    }

    return ( 
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="w-11/12 max-w-[500px] max-h-[700px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
            <div className="flex justify-between  ">
                <p className="text-lg font-semibold">{view && "Viewing"}{add && "Adding"}{edit && "Editing"} Lecture</p>
                <button onClick={()=>(!loading ?setModalData(null):null)}><RxCross1/></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-4">
                    <Upload 
                    id="LectureVideo"
                     name="LectureVideo"
                     label="Upload Video"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        video={true}
                        viewData = {view && modalData.videoUrl}
                        editData = {edit && modalData.videoUrl}
                    />
                    </div>
                    <div>
                        <label htmlFor="LectureTitle" className="mb-2">Lecture Title</label>
                        <input id="LectureTitle" className="w-full mb-4 rounded-md border-richblack-700 bg-richblack-700 p-2 text-richblack-50" type="text" {...register("LectureTitle",{required:true})}/>
                        {errors.LectureTitle && <p>LectureTitle field is required</p>}
                    </div>
                    <div>
                        <label htmlFor="LectureDesc" className="mb-2">Lecture Description</label>
                        <textarea id="LectureDesc" className="w-full mb-4 rounded-md border-richblack-700 bg-richblack-700 p-2 min-h-[75px] h-28 text-richblack-50"type="text" {...register("LectureDesc",{required:true})}/>
                        {errors.LectureDesc && <p>LectureDescription field is required</p>}
                    </div>
                    {
                        !view && (
                            <div className="flex justify-center">
                                <button className="rounded-md cursor-pointer  flex gap-2 items-center px-6 py-1 font-semibold  text-black bg-yellow-50 hover:scale-95"
                                type="submit">
                                {loading ? "Loading...": edit?"Save Changes":"Add"}</button>
                            </div>
                        )
                    }



                </form>
        </div>
    </div> );
}
 
export default SubSectionModal;