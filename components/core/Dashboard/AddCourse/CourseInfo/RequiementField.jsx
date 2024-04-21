
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const RequirementField = ({name,label,reset,issubmitted,setissubmitted,register,errors,setValue,getValue}) => {
    const [requirements,setRequirements] = useState([]);
    const [requirementList,setRequirementList] = useState([]);
    const { editCourse, course } = useSelector((state) => state.course)
    const handleaddRequirement = (e) => {
        e.preventDefault();
        if(requirements.length>0){
            setRequirementList([...requirementList,requirements]);
            setRequirements("");
        }
    }
    if(issubmitted){
        setRequirementList([]);
        setissubmitted(false);
    }
    const handleremoveRequirement = (index) => {
       
        const updatedList = [...requirementList];
        updatedList.splice(index,1);
        setRequirementList(updatedList);

    }
    useEffect(() => {
        if(editCourse){
            setRequirementList(course?.instructions);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(() => {
        setValue(name,requirementList); 
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[requirementList])
    useEffect(()=>{
        register(name,
            {required:true,
            validate: (value)=> value.length>0,
            }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return ( 
    <div>
        <label htmlFor={name} className=" w-full text-sm font-medium text-richblack-25">
        {label} <sup className="text-yellow-5">*</sup>
        </label>
        <div>
            <input
               type="text"
               id={name}
                name={name}
                onChange={(e) => setRequirements(e.target.value)}
                value={requirements}
                placeholder='Add a requirement'
                className="w-full rounded-md border-richblack-700 pl-4 bg-richblack-700 p-2 text-richblack-50"
               />
               <button onClick={handleaddRequirement} className="text-center px-5 py-1 text-[16px] rounded-md font-bold
                bg-yellow-50 text-black mt-3 ">Add</button>

        </div>
        <ul >
        {
            requirementList.length>0 && requirementList.map((item,index) => {
                return(
                    <li key={index} className="flex flex-col gap-4 mt-4 ">
                        <p className='text-richblack-25 font-medium'>{item}</p>
                        <button onClick={() => handleremoveRequirement(index)} className="text-center px-5 py-1 w-[6rem] text-[16px] rounded-md font-bold
                         bg-yellow-50 text-black ">Remove</button>

                    </li>
                )
            })
        }
            </ul>
        {
            errors[name] && <p className="text-yellow-25">{label} is required</p>
        }
        



    </div> );
}
 
export default RequirementField;