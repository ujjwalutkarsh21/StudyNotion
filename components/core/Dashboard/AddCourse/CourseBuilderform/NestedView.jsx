import React, { useEffect } from 'react';
import { useState } from 'react';
import SubSectionModal from "./SubSectionModal"
import ConfirmationModal from "../../../../common/Confirmationmodal"
import { deleteSection, updateSection } from "../../../../../services/operations/course"
import { deleteSubSection } from '../../../../../services/operations/course';
import {AiFillDelete, AiOutlinePlus} from "react-icons/ai";
import {AiFillEdit} from "react-icons/ai";
import {setCourse} from "../../../../../slices/courseSlice";
import {BiSolidDownArrow} from "react-icons/bi";
import {RxDropdownMenu} from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
const NestedView = ({handleChangeEditSectionName}) => {
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const {course} = useSelector(state => state.course)
    const [addSubSection, setAddSubSection] = useState(null);
    const  [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    // useEffect(()=>{
    //     // console.log("nested component-->",course);
    // });
    const handleDeleteSection = async(sectionId,courseId) => {
        const result = await deleteSection(
        {
            sectionID:sectionId,
            courseId:courseId,    
           
        },
         token,)

        if(result){
            dispatch(setCourse(result));

        }
        setConfirmationModal(null);
    }
    const handleDeleteSubSection = async(subSectionId,sectionId) => {
        const result = await deleteSubSection({
            subsectionID:subSectionId,
            sectionID:sectionId,
            courseId:course._id,    
        },token,)
        const updatedCourse = course.courseContent.map((section)=>(section._id === sectionId ? result:section));
        const updatedCourseData = {...course,courseContent:updatedCourse};
        if(result){
            dispatch(setCourse(updatedCourseData));

        }
        setConfirmationModal(null);
    }
    return ( 
    <div>
        <div className="rounded-lg bg-richblack-700 p-5 px-8">
           {course.courseContent.map((section, index) => {
            return(
            <details key={index} open>
                <summary className='flex items-center justify-between gap-x-3 py-2 border-b-2 '>
                    <div className="flex items-center gap-x-3">
                        <RxDropdownMenu/>
                        <p>{section.sectionName}</p>
                    </div>
                    <div className='flex gap-x-4 items-center'>
                    <button onClick={()=>handleChangeEditSectionName(section._id,section.sectionName,course._id)}>
                        <AiFillEdit/>
                    </button>
                    <button
                    onClick={()=>setConfirmationModal({
                        text1:"Delete this Section",
                        text2:"All the lectures in this section will be deleted",
                        btn1Text:"Delete",
                        btn2Text:"Cancel",
                        btn1Handler:()=>handleDeleteSection(section._id,course._id),
                        btn2Handler:()=>setConfirmationModal(null),
                    })
                        }>
                        <AiFillDelete/>
                    </button>
                    <span>|</span>
                    <BiSolidDownArrow  className=" scale-75 text-xl text-richblack-300"/>
                    </div>

                </summary>
                <div>
                    {
                    section.subSection.map((subSection) => {
                        return(
                            <div 
                            key={subSection?._id}
                            onClick={()=>setViewSubSection({...subSection,sectionID:section._id})}
                            className='flex items-center justify-between gap-x-3 border-b-2'>
                                <div className="flex items-center gap-x-3">
                                    <RxDropdownMenu/>
                                    <p>{subSection.title}</p>
                                 </div>
                                 <div className='flex items-center gap-x-4'>
                                    <button onClick={()=>setEditSubSection({...subSection,sectionID:section._id})}>
                                         <AiFillEdit/>
                                    </button>
                                    <button
                                     onClick={()=>{
                                            setConfirmationModal(
                                                {text1:"Delete this SubSection",
                                                text2:"Selected lectures in this section will be deleted",
                                                btn1Text:"Delete",
                                                btn2Text:"Cancel",
                                                btn1Handler:()=>handleDeleteSubSection(subSection._id,section._id),
                                                btn2Handler:()=>setConfirmationModal(null)
                                                });
                                            }}>
                                            <AiFillDelete/>
                                    </button>
                                 </div>

                            </div>
                        )
                    })
                    }
                    <button onClick={()=>setAddSubSection(section._id)}
                    className="mt-4 flex items-center gap-x-2 text-yellow-50">
                        <AiOutlinePlus />
                        <p>Add Lecture</p>
                    </button>
                </div>
            </details>
                )
           })}
        </div>
        {addSubSection ?<SubSectionModal modalData={addSubSection} setModalData= {setAddSubSection} add={true}/> :
         viewSubSection ?<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/> : 
         editSubSection ? <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/> : <div></div>}
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>  );
}
 
export default NestedView;