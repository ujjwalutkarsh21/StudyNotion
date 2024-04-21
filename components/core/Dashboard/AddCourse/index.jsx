import RenderSteps from "./RenderSteps";
const AddCourse = () => {
    return ( 
        <>
        <div className="flex w-full items-start gap-x-6">
            <div className="flex flex-1 flex-col">
                <h1 className="mb-14 text-3xl font-medium text-richblack-5">Add Course</h1>
                <div className="flex-1">
                    <RenderSteps/>
                </div>
            </div >
            <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
                <p className="mb-8 text-lg font-semibold text-richblack-5">Code Upload Tips</p>
                <ul className="ml-5 list-item list-disc space-y-4 text-md font-normal text-richblack-25">
                    <li>
                        Set the Course Price option or make it free
                    </li>
                    <li>
                        Standard size of course thumbnail is 1024x576
                    </li>
                    <li>
                        Video section controls the course overview video
                    </li>
                    <li>
                        Set the Course Price option or make it free
                    </li>
                    <li>
                        Standard size of course thumbnail is 1024x576
                    </li>
                    <li>
                        Video section controls the course overview video
                    </li>
                </ul>
            </div>
        </div>

        </> );
}
 
export default AddCourse;