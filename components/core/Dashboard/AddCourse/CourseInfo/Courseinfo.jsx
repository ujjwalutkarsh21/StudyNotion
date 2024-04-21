import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import Upload from "../CourseBuilderform/Upload"
import ChipInput from "./Createtags";
import {addCourseDetails,editCourseDetails,fetchCourseCategories} from "../../../../../services/operations/course"
import RequirementField from "./RequiementField";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
const CourseInformationForm = () => {
   const [issubmitted,setissubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState:{errors},
    } = useForm();
    const {step} = useSelector((state)=>state.course);
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const {course, editCourse} = useSelector((state)=>state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(()=> {
        // const getCategories = async() => {
        //     setLoading(true);
        //     const categories = await fetchCourseCategories();
        //     if(categories.length > 0) {
        //         setCourseCategories(categories);
        //     }
        //     setLoading(false);
        // }
        //get sublinks from localstorage
        const sublinks = JSON.parse(localStorage.getItem("sublinks"));
        setCourseCategories(sublinks);

        if(editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        //getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
 const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() )
            return true;
        else
            return false;
    }
    const onSubmit = async(data) => {
        console.log("clicked");
        console.log("dataaaa->",data);
    
        if(editCourse) {
            if(isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

            formData.append("courseId", course._id);
            if(currentValues.courseTitle !== course.courseName) {
                formData.append("courseName", data.courseTitle);
            }

            if(currentValues.courseShortDesc !== course.courseDescription) {
                formData.append("courseDescription", data.courseShortDesc);
            }

            if(currentValues.coursePrice !== course.price) {
                formData.append("price", data.coursePrice);
            }

            if(currentValues.courseBenefits !== course.whatYouWillLearn) {
                formData.append("whatYouWillLearn", data.courseBenefits);
            }

            if(currentValues.courseCategory._id !== course.category._id) {
                formData.append("category", data.courseCategory);
            }

            if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                formData.append("instructions", JSON.stringify(data.courseRequirements));
            }
            

            setLoading(true);
            try{
            const result = await editCourseDetails(formData, token);
            console.log("PRINTING result", result);
            setLoading(false);
            if(result) {
                setStep(2);
                dispatch(setCourse(result));
            }}
            catch(err) {
                setLoading(false);
                console.log("ERROR", err);
                toast.error("Something went wrong");
            }
            console.log("PRINTING FORMDATA", formData);
            } 
            else {
                toast.error("NO Changes made so far");
            }

            return;
        }
    
        const formData = new FormData();
        //console.log("data.courseTitle:", data.courseTitle);
        console.log("data", data    );
        formData.append("courseName", data.courseTitle);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("thumbnail", data.courseImage);
        //console.log("formData.courseName:", formData.get("courseName"));
        // formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", COURSE_STATUS.DRAFT);

        setLoading(true);
        //console.log("BEFORE add course API call");
        //console.log("PRINTING FORMDATA", formData);
        const result = await addCourseDetails(formData,token);
        if(result?.instructor) {
            // console.log(step);
            dispatch(setStep(2));
            dispatch(setCourse(result));
            // console.log(step);
        }
        setLoading(false);
        setissubmitted(true);
        //console.log("PRINTING FORMDATA", formData);
        console.log("PRINTING result", result);
        reset();

    }

    return ( 
    <div>
        <form onSubmit={handleSubmit(onSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-6">
            <div>
                <label htmlFor="courseTitle" className=" w-full text-sm font-medium text-richblack-25">
                Course Title<sup className="text-yellow-5">*</sup>
                </label>
                <input type="text" name="courseTitle" id="courseTitle"
                 placeholder="Course Title"
                 className="w-full rounded-md border-richblack-700 bg-richblack-700 p-2 text-richblack-50"
                    {...register("courseTitle",{required:true})}/>
                    
                    {
                        errors.courseTitle && <p className="text-yellow-25">Course Title is required</p>
                    }
                
            </div>
            <div>
                <label htmlFor="courseShortDesc" className=" w-full text-sm font-medium text-richblack-25">
                Course Description<sup className="text-yellow-5">*</sup>
                </label>
                <textarea type="text" name="courseShortDesc" id="courseShortDesc"
                    placeholder="Course Description"    
                    className="w-full rounded-md border-richblack-700 bg-richblack-700 p-2 h-28 text-richblack-50"
                    {...register("courseShortDesc",{required:true})}/>
                    {
                        errors.courseShortDesc && <p className="text-yellow-25">Course Description is required</p>
                    }
            </div>
            <div className="relative ">
                <label htmlFor="coursePrice" className=" w-full text-sm font-medium  text-richblack-25">
                Course Price<sup className="text-yellow-5">*</sup>
                </label>
                
                <input type="number" name="coursePrice" id="coursePrice"
                    placeholder="Course Price"
                    className="w-full rounded-md pl-7 border-richblack-700 placeholder-translate-x-5 bg-richblack-700 p-2 text-richblack-50"
                    {...register
                        ("coursePrice",{
                        required:true,
                        valueAsNumber:true,
                        })}
                />

                <HiOutlineCurrencyRupee className="text-yellow-5 absolute top-9 left-2"/>
                    {
                        errors.coursePrice && <p className="text-yellow-25">Course Price is required</p>
                    }
            </div>
            <div>
                <label htmlFor="courseCategory" className=" w-full text-sm font-medium text-richblack-25">
                Course Category<sup className="text-yellow-5">*</sup>
                </label>
                <select type="text" name="courseCategory" id="courseCategory"
                    className="w-full rounded-md border-richblack-700 bg-richblack-700 p-2 text-richblack-50" 
                    placeholder="Course Category"
                    defaultValue="" {...register("courseCategory",
                    {required:true}
                    )}>
                   
                    <option value="" disabled>Select Category</option>
                       
                    {!loading && courseCategories.map((item,index) => 
                    {
                        return(
                            <option key={index} value={item?._id}>{item?.name}</option>
                        )
                    }
                    )}
                    
                </select>
                {
                        errors.courseCategory && <p className="text-yellow-25">Course Category is required</p>
                }
            </div>
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

             <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
                viewData={course?.thumbnail || null}
            />
            <div>
                <label htmlFor="courseBenefits" className=" w-full text-sm font-medium text-richblack-25">
                Course Benefits <sup className="text-yellow-5">*</sup>
                </label>
                <textarea type="text" name="courseBenefits" id="courseBenefits"
                    placeholder="What you will learn"
                    className="w-full rounded-md border-richblack-700 bg-richblack-700 p-2 h-28 text-richblack-50"
                    {...register("courseBenefits",{required:true})}/>
                    {
                        errors.courseBenefits && <p className="text-yellow-25">What you will learn is required</p>
                    }
            </div>
            <RequirementField
            name="courseRequirements"
            label="Prerequisites for this course"
            register= {register}
            
            errors={errors}
            issubmitted={issubmitted}
            setissubmitted={setissubmitted}
            setValue={setValue}
            getValue={getValues}
            />
            <div className="flex justify-end gap-3 mr-8">
            {
                editCourse &&
                <button className="text-center px-5 py-2 hover:scale-95 transition-all duration-200 text-[16px] rounded-md font-bold
                bg-richblack-900 text-white"
                 onClick={()=>dispatch(setStep(2))}
                >
                    Continue without saving</button>
            }
            <button type="submit" className="text-center px-5 py-1 text-[16px] hover:scale-95 transition-all duration-200 rounded-md font-bold
                bg-yellow-50 text-black ">{!editCourse?"Next": "Save Changes"}</button>

            </div>
            </form>

    </div> );
    }

export default CourseInformationForm;