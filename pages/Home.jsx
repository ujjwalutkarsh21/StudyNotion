import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Banner from "../assets/imgvideo/Images/banner.mp4"
import { CTAButton } from "../components/core/HomePage/CTAbutton"
import { HighlightText } from "../components/core/HomePage/HighlightText"
import {CodeBlocks} from "../components/core/HomePage/CodeBlocks"
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import ImageComponent from "../components/core/HomePage/ImageCompo";
import InstructorSec from "../components/core/HomePage/InstructorSec";
// import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
const Home = () => {
    return (<>
        <div className="relative mx-auto mt-5 bg-richblack-900 max-w-maxContent flex flex-col w-11/12 
        items-center text-richblack-5 justify-between">
               

            {/* section 1 */}


            {/* linktag */}
            <Link to={"/signup"}>
                <div className=" group   p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit ">
                    <div className="group-hover:bg-blue-900 rounded-full w-full flex transition-all duration-200 mx-auto px-8 p-1 gap-2 items-center ">
                        <p >Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            {/* headings */}

            <div className="text-4xl mt-8 mb-3 font-semibold ">
                Empower Your Future With<HighlightText text={"Coding Skills"} />
            </div>

            {/* sub heading*/}
            <div className="text-puregreys-200  text-center">
                With our online courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands on projects, quizzes, and personalized feedback from Instructors.
            </div>
            <div className="flex 
            gap-3 flex-row mt-12 mb-6">
                <CTAButton text="Learn more" active={true} linkto={"/signup"} />
                <CTAButton text="Book a Demo" active={false} linkto={"/login"} />
            </div>
            <div className="shadow-blue-200 mx-3 my-12">
                <video
                    muted loop  autoPlay>
                    <source src={Banner} type="video/mp4" />
                </video>
            </div>
            {/* Code Section 1 */}
            <div className="mt-10 flex flex-col gap-10">
                <CodeBlocks
                position="lg:flex-row sm:flex-col" 
                heading={
                    <div>Unlock Your <HighlightText text="Coding Potential"/>
                    Through Our Online Courses</div>
                } 
                subheading=
                    "Our courses are designed and taught by industry experts who have years of experience in their respective fields"
                
               ctabtn1={[
                    "Try It Yourself",
                    "/signup",
                    true,
                ]}
                ctabtn2={[
                    "Learn more",
                    "/login",
                    false,
                ]}
                  
                codeblock={`
                <!DOCTYPE html>
                <head>
                </head>
                <body>
                <h1>Welcome Future developers</h1>
                <h2> We are excited to be a part of your journey</h2>
                </body>
                </html>`}
                
               
                codeColor="text-yellow-5"
                />
                <CodeBlocks
                position="flex-row-reverse" 
                heading={
                    <div>Unlock Your <HighlightText text="Coding Potential"/>
                    Through Our Online Courses</div>
                } 
                subheading=
                    "Our courses are designed and taught by industry experts who have years of experience in their respective fields"
                
               ctabtn1={[
                    "Try It Yourself",
                    "/signup",
                    true,
                ]}
                ctabtn2={[
                    "Learn more",
                    "/login",
                    false,
                ]}
                  
                codeblock={`
                <!DOCTYPE html>
                <head>
                </head>
                <body>
                <h1>Welcome Future developers</h1>
                <h2> We are excited to be a part of your journey</h2>
                </body>
                </html>`}
                
               
                codeColor="text-yellow-5"
                />
                {/* <ExploreMore/> */}
            </div>


            {/* section2 */}
            </div>

            <div className="bg-puregreys-5 text-richblack-700  max-w-full mt-10 ">
                <div className="homepage_bg h-[200px] flex items-center justify-center ">
                    <div className="flex w-full max-w-maxContent items-center justify-center  gap-5 "
                    >
                        <div className="lg:flex lg:flex-row sm:flex-col sm:flex justify-center mb-10 mt-9 lg:items-center sm:items-center sm:justify-center lg:gap-3 sm:gap-3 text-white w-full h-full ">
                            <CTAButton active={true} linkto={"/signup"}
                            text={  <div className="flex items-center gap-2 flex-row ">
                                        Explore all Catalog
                                        <FaArrowRight/>
                                     </div>}  />
                            <CTAButton active={false} linkto={"/signup"} text={"Learn more"}/>
                        </div>
                    </div>
                </div>
                <div className="mx-auto w-11/12 relative  max-w-maxContent flex flex-col items-center justify-between gap-7 mt-4">
                    <div className="lg:flex lg:flex-row sm:flex sm:flex-col sm:justify-center sm:items-center gap-12 mb-12   mt-12">
                        <div className="text-4xl  text-center font-semibold w-[45%] sm:w-[100%]">
                            Get the skills that you need for a
                            <HighlightText text={"Job that is in demand"}/>
                        </div>
                        <div className="flex flex-col gap-10 w-[40%] text-center sm:w-[100%]  ">
                            <p className="text-[16px] text-puregreys-900 font-semibold">The modern StudyNotion dictates its own terms. Today, to be a 
                                competitive specialist requires more than professional skills.
                            </p>
                            <CTAButton active={true} linkto={"/signup"} text={"Learn more"}/>

                        </div>
                    </div>
                        <TimeLineSection/>
                        <ImageComponent/>
                </div>

            </div>
             {/* section 3 */}
     <div className="w-11/12 bg-richblack-900 font-bold  max-w-maxContent  flex flex-col justify-between gap-5 ">
               <InstructorSec/>
               <h2 className="text-4xl text-center font-semibold  text-white my-10">Reviews From Other Learners</h2> 
     </div>
     <Footer/>
</>

    );
}

export default Home;